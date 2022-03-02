const express = require("express");

const Cart = require("../models/cart.model");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const cartitems = await Cart.find()
      .populate("userId")
      .populate("productId")
      .lean()
      .exec();
    return res.status(200).send(cartitems);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("/userCartItem", async (req, res) => {
  try {
    const cartItems = await Cart.findOne({ userId: req.body.userId })
      .populate("userId")
      .populate("productId")
      .lean()
      .exec();
    return res.status(200).send(cartItems);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.patch("/removeItem", async (req, res) => {
  try {
    let user = await Cart.findOne({ userId: req.body.userId }).lean().exec();
    user.productId = user.productId.filter((elem, i) => {
      if (i !== req.body.removeElemFromIndex) return elem;
    });
    user = await Cart.findOneAndUpdate(
      { userId: req.body.userId },
      { productId: user.productId },
      { new: true }
    );
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.patch("/removeAllItem", async (req, res) => {
  try {
    let user = await Cart.findOneAndUpdate(
      { userId: req.body.userId },
      { productId: [] },
      { new: true }
    );
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("/arraylength", async (req, res) => {
  try {
    const user = await Cart.findOne({ userId: req.body.userId }).lean().exec();
    if (!user) {
      return res.status(200).send({ cartArrayLength: 0 });
    }
    return res.status(200).send({ cartArrayLength: user.productId.length });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("", async (req, res) => {
  try {
    const user = await Cart.findOne({ userId: req.body.userId }).lean().exec();
    if (!user) {
      const cartitem = await Cart.create(req.body);
      return res.status(201).send(cartitem);
    }
    await Cart.updateOne(
      { userId: req.body.userId },
      { $push: { productId: req.body.productId } }
    );
    return res.status(201).send({ message: "successfully added to cart" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
