const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");

const userSchema = Schema(
  {
    full_name: {
      type: String,
      required: [true, "nama harus diisi"],
      maxLength: [255, "panjang nama harus antara 3 - 255 karakter"],
      minLength: [3, "panjang nama harus antara 3 - 255 karakter"],
    },
    customer_id: {
      type: Number,
    },
    email: {
      type: String,
      required: [true, "Email harus diisi"],
      maxLength: [255, "panjang email maksimal 255 karakter"],
    },
    password: {
      type: String,
      required: [true, "password harus diisi"],
      maxLength: [255, "panjang password maksimal 255 karakter"],
      minLength: [6, "panjang password minimal 6 karakter"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    token: [String],
  },
  {
    timestamps: true,
  }
);

userSchema.path("email").validate(
  (value) => {
    const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return EMAIL_RE.test(value);
  },
  (attr) => `${attr.value} tidak valid!`
);

userSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("User").count({ email: value });

      return !count;
    } catch (error) {
      throw error;
    }
  },
  (attr) => `${attr.value} sudah terdaftar!`
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.plugin(AutoIncrement, { inc_field: "customer_id" });

module.exports = model("User", userSchema);
