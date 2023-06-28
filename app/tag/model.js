const { model, Schema } = require("mongoose");

const tagSchema = Schema({
  name: {
    type: String,
    minLength: [3, "Panjang nama tag minimal 3 karakter"],
    maxLength: [20, "Panjang nama tag minimal 20 karakter"],
    required: [true, "Nama tag harus di isi"],
  },
});

module.exports = model("Tag", tagSchema);
