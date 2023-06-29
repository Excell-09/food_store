const { model, Schema } = require("mongoose");

const cartItemSchema = Schema({
  name: {
    type: String,
    minLength: [5, "Panjang nama makan minimal 5 karakter"],
    required: [true, "Nama makanan harus di isi"],
  },
  qty: {
    type: Number,
    min: [1, "minimal qty adalah 1"],
    required: [true, "qty harus di isi"],
  },
  price: {
    type: Number,
    default: 0,
  },
  image_url: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

module.exports = model("CartItem", cartItemSchema);
