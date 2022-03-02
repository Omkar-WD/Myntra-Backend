const express = require("express");
const router = express.Router();
const Address = require("../models/address.model");

router.get("", async (req, res) => {
  try {
    const address = await Address.findOne({ userId: req.body.userId })
      .populate("userId")
      .lean()
      .exec();
    return res.send(address);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.post("", async (req, res) => {
  try {
    let user = await Address.findOne({ userId: req.body.userId }).lean().exec();
    if (!user) {
      const address = await Address.create(req.body);
      return res.status(201).send(address);
    }
    user = await Address.findOneAndUpdate(
      { userId: req.body.userId },
      {
        pincode: req.body.pincode,
        address: req.body.address,
        town: req.body.town,
        city: req.body.city,
        state: req.body.state,
        userId: req.body.userId,
      },
      { new: true }
    );
    return res.status(200).send(user);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});
module.exports = router;
