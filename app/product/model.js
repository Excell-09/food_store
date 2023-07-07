const { model, Schema } = require("mongoose");

const productSchema = Schema(
  {
    name: {
      type: String,
      minLength: [3, "Panjang nama makanan minimal 3 karakter"],
      required: [true, "Nama makanan harus di isi"],
    },
    description: {
      type: String,
      maxLength: [1000, "panjang deskripsi maksimal 1000 karakter"],
    },
    price: {
      type: Number,
      default: 0,
    },
    image_url: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);
