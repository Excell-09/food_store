const { model, Schema } = require("mongoose");

const categorySchema = Schema({
  name: {
    type: String,
    minLength: [3, "Panjang nama category minimal 3 karakter"],
    maxLength: [20, "Panjang nama category minimal 20 karakter"],
    required: [true, "Nama category harus di isi"],
  },
});

module.exports = model("Category", categorySchema);
