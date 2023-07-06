const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const orderItemSchema = Schema({
  name: {
    type: String,
    minLength: [3, "panjang nama makanan minimal 3 karakter"],
    required: [true, "nama harus diisi"],
  },
  price: {
    type: Number,
    required: [true, "harga item harus diisi"],
  },
  qty: {
    type: Number,
    min: [1, "kuantitas minimal 1"],
    required: [true, "harga item harus diisi"],
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
});

module.exports = model("OrderItem", orderItemSchema);
