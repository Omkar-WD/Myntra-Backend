require("dotenv").config();
const express = require("express");
const EventEmitter = require("events");
const { sendOTP } = require("../utils");
const User = require("../models/user.model");

const router = express.Router();
const eventEmitter = new EventEmitter();

router.get("", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).lean().exec();
    let otp = Math.floor(1000 + Math.random() * 9000);
    eventEmitter.on("Send Payment OTP", sendOTP);
    eventEmitter.emit("Send Payment OTP", user, otp);
    return res.status(200).send({ otp });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
module.exports = router;
