const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.gmail_id,
    pass: process.env.gmail_specific_pass,
  },
});
