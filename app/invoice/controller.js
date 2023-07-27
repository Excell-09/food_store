const { subject } = require("@casl/ability");
const Invoice = require("./model");
const { policyFor } = require("../../utils");

const view = async (req, res) => {
  try {
    const { order_id } = req.params;
    let invoice = await Invoice.findOne({ order: order_id })
      .populate("order")
      .populate("user");
    let policy = policyFor(req.user);
    let subjectInvoice = subject("Invoice", {
      ...invoice,
      user_id: invoice.user._id,
    });
    if (!policy.can("read", subjectInvoice)) {
      return res.json({
        error: 1,
        message: "Anda tidak memiliki akses untuk melihat ini!",
      });
    }

    return res.json(invoice);
  } catch (err) {
    console.log({ err });
    return res.json({
      error: 1,
      message: "Error when getting invoice!",
    });
  }
};

const index = async (req, res) => {
  try {
    let invoices = await Invoice.find({ user: req.user._id })
      .populate("order")
      .populate("user")
      .populate({
        path: "order",
        populate: {
          path: "order_items",
        },
      })
      .sort("-updatedAt");
    return res.json(invoices);
  } catch (err) {
    return res.json({
      error: 1,
      message: "Error when getting invoice!",
    });
  }
};

const getAllInvoices = async (_, res) => {
  try {
    let invoices = await Invoice.find()
      .populate("order")
      .populate("user")
      .populate({
        path: "order",
        populate: {
          path: "order_items",
        },
      })
      .sort("-updatedAt");

    return res.json(invoices);
  } catch (err) {
    return res.json({
      error: 1,
      message: "Error when getting invoice!",
    });
  }
};

const update = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.order_id, {
      ...req.body,
      payment_status:
        req.body.payment_status === "paid" ? "waiting_payment" : "paid",
    });

    return res.json(invoice);
  } catch (err) {
    return res.json({
      error: 1,
      message: "Error when getting invoice!",
    });
  }
};

module.exports = {
  index,
  view,
  getAllInvoices,
  update,
};
