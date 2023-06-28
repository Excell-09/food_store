const Category = require("./model");

async function store(req, res, next) {
  try {
    let payload = req.body;
    let category = await Category.create({ ...payload });
    return res.json(category);
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

    let category = await Category.findByIdAndUpdate(id, payload, { new: true, runValidator: true });
    return res.json(category);
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
    let category = await Category.find();
    return res.json(category);
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
    let category = await Category.findByIdAndDelete(req.params.id);
    return res.json(category);
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
