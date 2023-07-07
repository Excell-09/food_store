const User = require("../user/model.js");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { getToken } = require("../../utils/index.js");

async function register(req, res, next) {
  try {
    const payload = req.body;

    let user = await User.create(payload);

    return res.json(user);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        massage: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
}

async function localStrategy(email, password, done) {
  try {
    let user = await User.findOne({ email }).select("-__v -createdAt -updatedAt -cart_items -token");
    if (!user) return done();
    if (bcrypt.compareSync(password, user.password)) {
      ({ password, ...userWithoutPassword } = user.toJSON());
      return done(null, userWithoutPassword);
    }
  } catch (error) {
    done(error, null);
  }
  done();
}

async function login(req, res, next) {
  passport.authenticate("local", async function (err, user) {
    if (err) return next(err);

    if (!user) return res.json({ error: 1, message: "email or password incorrect!" });

    let signed = jwt.sign(user, config.secretKey);

    await User.findByIdAndUpdate(user._id, { $push: { token: signed } });

    return res.json({
      message: "Login succesfully",
      user,
      token: signed,
    });
  })(req, res, next);
}

async function logout(req, res, next) {
  let token = getToken(req);

  let user = await User.findOneAndUpdate(
    { token: { $in: [token] } },
    { $pull: { token: token } },
    { useFindAndModify: false }
  );

  if (!token || !user) {
    return res.json({
      error: 1,
      message: "not found user!",
    });
  }

  return res.json({
    error: 0,
    message: "Logout Success!",
  });
}

module.exports = {
  register,
  login,
  localStrategy,
  logout,
};
