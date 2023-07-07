const { subject } = require("@casl/ability");
const Invoice = require("./model");
const Order = require("../order/model");
const { policyFor } = require("../../utils");

const view = async (req, res) => {
  try {
    const { order_id } = req.params;
    let invoice = await Invoice.findOne({ order: order_id }).populate("order").populate("user");
    let policy = policyFor(req.user);
    let subjectInvoice = subject("Invoice", { ...invoice, user_id: invoice.user._id });
    if (!policy.can("read", subjectInvoice)) {
      return res.json({
        error: 1,
        message: "Anda tidak memiliki akses untuk melihat ini!",
      });
    }

    return res.json(invoice);
  } catch (err) {
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
      });
    return res.json(invoices);
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
};
