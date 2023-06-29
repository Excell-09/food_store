const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const deliveryAddressSchema = Schema(
  {
    nama: {
      type: String,
      required: [true, "nama alamat harus diisi"],
      maxLength: [255, "panjang nama alamat harus antara 3 - 255 karakter"],
    },
    kelurahan: {
      type: String,
      required: [true, "kelurahan harus diisi"],
      maxLength: [255, "panjang kelurahan harus antara 3 - 255 karakter"],
    },
    kecamatan: {
      type: String,
      required: [true, "kecamatan harus diisi"],
      maxLength: [255, "panjang kecamatan harus antara 3 - 255 karakter"],
    },
    kabupaten: {
      type: String,
      required: [true, "kabupaten harus diisi"],
      maxLength: [255, "panjang kabupaten harus antara 3 - 255 karakter"],
    },
    provinsi: {
      type: String,
      required: [true, "provinsi harus diisi"],
      maxLength: [255, "panjang provinsi harus antara 3 - 255 karakter"],
    },
    detail: {
      type: String,
      required: [true, "detail harus diisi"],
      maxLength: [255, "panjang detail harus antara 3 - 255 karakter"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("DeliveryAddress", deliveryAddressSchema);
