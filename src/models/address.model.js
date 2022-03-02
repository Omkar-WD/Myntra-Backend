const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    pincode: { type: Number, required: true },
    address: { type: String, required: true },
    town: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("address", addressSchema);
