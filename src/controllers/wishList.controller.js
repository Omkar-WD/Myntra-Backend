const express = require("express");

const WishList = require("../models/wishList.model");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const wishListItems = await WishList.find()
      .populate("userId")
      .populate("productId")
      .lean()
      .exec();
    return res.status(200).send(wishListItems);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("/userCartItem", async (req, res) => {
  try {
    const wishListItems = await WishList.findOne({ userId: req.body.userId })
      .populate("userId")
      .populate("productId")
      .lean()
      .exec();
    return res.status(200).send(wishListItems);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("/arraylength", async (req, res) => {
  try {
    const user = await WishList.findOne({ userId: req.body.userId })
      .lean()
      .exec();
    if (!user) {
      return res.status(200).send({ wishListArrayLength: 0 });
    }
    return res.status(200).send({ wishListArrayLength: user.productId.length });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("", async (req, res) => {
  try {
    const user = await WishList.findOne({ userId: req.body.userId })
      .lean()
      .exec();
    if (!user) {
      const wishListItem = await WishList.create(req.body);
      return res.status(201).send(wishListItem);
    }
    await WishList.updateOne(
      { userId: req.body.userId },
      { $push: { productId: req.body.productId } }
    );
    return res.status(201).send({ message: "successfully added to wishlist" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
