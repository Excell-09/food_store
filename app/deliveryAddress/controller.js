const { subject } = require("@casl/ability");
const DeliveryAddress = require("./model");
const { policyFor } = require("../../utils/index");

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let user = req.user;

    const deliveryAddress = await DeliveryAddress.create({ ...payload, user: user._id });
    return res.json(deliveryAddress);
  } catch (err) {
    console.log(err);
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};
const index = async (req, res, next) => {
  try {
    let { skip = 0, limit = 10 } = req.query;
    let count = await DeliveryAddress.find({ user: req.user._id }).countDocuments();
    let address = await DeliveryAddress.find({ user: req.user._id })
      .skip(Number(skip))
      .limit(Number(limit))
      .sort("-createdAt");
    return res.json({
      data: address,
      count,
    });
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    let { _id, ...payload } = req.body;
    let { id } = req.params;
    let address = await DeliveryAddress.findById(id);
    let subjectAddress = subject("DeliveryAddress", { ...address, user_id: address.user });
    let policy = policyFor(req.user);

    if (!policy.can("update", subjectAddress)) {
      return res.json({
        error: 1,
        message: "you are not allowed to modify this resource",
      });
    }

    address = await DeliveryAddress.findByIdAndUpdate(id, payload, { new: true });
    return res.json(address);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};
const destroy = async (req, res, next) => {
  try {
    let { id } = req.params;
    let address = await DeliveryAddress.findById(id);
    let subjectAddress = subject("DeliveryAddress", { ...address, user_id: address.user });
    let policy = policyFor(req.user);

    if (!policy.can("update", subjectAddress)) {
      return res.json({
        error: 1,
        message: "you are not allowed to modify this resource",
      });
    }

    address = await DeliveryAddress.findByIdAndDelete(id);
    return res.json(address);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

module.exports = {
  store,
  index,
  update,
  destroy,
};
