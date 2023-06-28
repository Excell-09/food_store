const jwt = require("jsonwebtoken");
const { getToken, policyFor } = require("../utils");
const config = require("../app/config");
const User = require("../app/user/model");

const decodeToken = () => {
  return async function (req, res, next) {
    try {
      let token = getToken(req);

      if (!token) return next();

      req.user = jwt.verify(token, config.secretKey);

      let user = await User.findOne({ token: { $in: [token] } });

      if (!user) {
        return res.json({
          error: 1,
          message: "token expired!",
        });
      }
    } catch (error) {
      if (error && error.name === "JsonWebTokenError") {
        return res.json({
          error: 1,
          message: error.message,
        });
      }
      next(error);
    }
    return next();
  };
};

const policy_check = (action, subject) => {
  return function (req, res, next) {
    let policy = policyFor(req.user);
    if (!policy.can(action, subject)) {
      return res.json({
        error: 1,
        message: `You are not allowed to ${action} ${subject}`,
      });
    }
    next();
  };
};

module.exports = {
  decodeToken,
  policy_check,
};
