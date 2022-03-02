const mongoose = require("mongoose");

const orderHistorySchema = new mongoose.Schema(
  {
    productId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("orderHistory", orderHistorySchema);
