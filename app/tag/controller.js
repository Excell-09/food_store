const Tag = require("./model");

async function store(req, res, next) {
  try {
    let payload = req.body;
    let tag = await Tag.create({ ...payload });
    return res.json(tag);
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

async function update(req, res, next) {
  try {
    let payload = req.body;
    let { id } = req.params;

    let tag = await Tag.findByIdAndUpdate(id, payload, { new: true, runValidator: true });
    return res.json(tag);
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

async function index(req, res, next) {
  try {
    let tag = await Tag.find();
    return res.json(tag);
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

async function destroy(req, res, next) {
  try {
    let tag = await Tag.findByIdAndDelete(req.params.id);
    return res.json(tag);
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

module.exports = {
  store,
  index,
  update,
  destroy,
};
