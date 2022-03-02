const express = require("express");
const suggetionCart = require("../models/suggestionCartData.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const suggetionCartData = await suggetionCart.find().lean().exec();
    return res.status(200).send({ suggetionArr: suggetionCartData });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
