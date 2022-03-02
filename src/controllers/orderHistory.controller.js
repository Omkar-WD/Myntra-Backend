const express = require("express");

const OrderHistory = require("../models/orderHistory.model");
const Cart = require("../models/cart.model");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const orderHistories = await OrderHistory.findOne({
      userId: req.body.userId,
    })
      .populate("productId")
      .lean()
      .exec();
    return res.status(200).send(orderHistories);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("", async (req, res) => {
  try {
    const user = await OrderHistory.findOne({ userId: req.body.userId })
      .lean()
      .exec();
    const cartItems = await Cart.findOne({ userId: req.body.userId })
      .populate("productId")
      .lean()
      .exec();
    let productIdArray = cartItems.productId;
    if (!user) {
      const orderHistory = await OrderHistory.create({
        userId: req.body.userId,
        productId: productIdArray,
      });
      const user2 = await Cart.findOneAndUpdate(
        { userId: req.body.userId },
        {
          productId: [],
        },
        { new: true }
      )
        .lean()
        .exec();
      return res.status(201).send(orderHistory);
    }
    const orderHistory = await OrderHistory.updateOne(
      { userId: req.body.userId },
      { $push: { productId: productIdArray } },
      { new: true }
    );
    const user2 = await Cart.findOneAndUpdate(
      { userId: req.body.userId },
      {
        productId: [],
      },
      { new: true }
    )
      .lean()
      .exec();
    // console.log(user2);
    return res.status(201).send(user2);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
