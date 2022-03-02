require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { body, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_TOKEN);
};

router.post(
  "",
  body("email")
    .isEmail()
    .bail()
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });
      if (!user) {
        throw new Error("Please try another email or password!!!");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .bail()
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: req.body.email });
      const match = user.checkPassword(value);
      if (!match) {
        throw new Error("Please try another email or password");
      }
      return true;
    }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      const user = await User.findOne(
        { email: req.body.email },
        { password: false }
      );
      const token = newToken(user);
      return res.status(200).send({ user, token, message: "success" });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

router.patch("", async (req, res) => {
  try {
    console.log("req body :", req.body);
    const user = await User.findByIdAndUpdate(req.body.userId, req.body, {
      new: true,
    })
      .lean()
      .exec();
    const token = newToken(user);
    return res.status(200).send({ user, token, message: "success" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).lean().exec();
    return res.status(200).send({ user, isLogin: true });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/logout", async (req, res) => {
  try {
    return res.status(200).send({ isLogin: false });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
module.exports = router;
