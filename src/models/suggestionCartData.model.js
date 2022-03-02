const mongoose = require("mongoose");

const suggestionCartDataSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    img: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: String, required: true },
    maxprice: { type: Number, required: true },
    discount: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("suggestionCartData", suggestionCartDataSchema);
