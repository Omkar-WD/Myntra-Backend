const transporter = require("./configs/mail");
require("dotenv").config();

const sendMail = async (user) => {
  await transporter.sendMail({
    from: `Omkar Pasalkar 👻<${process.env.gmail_id}`,
    to: user.email,
    subject: `Welcome to Myntra ${user.fullName}`,
    text: `Hi ${user.fullName}, Please confirm your email address by clicking on following link
    link - "http://127.0.0.1:5501/"`,
  });
};

const sendOTP = async (user, OTP) => {
  await transporter.sendMail({
    from: `Omkar Pasalkar 👻<${process.env.gmail_id}`,
    to: user.email,
    subject: `Myntra : Payment OTP`,
    text: `Hi ${user.fullName}, Your OTP for Payment is ${OTP}`,
  });
};

const sendMailToAdmins = async (user) => {
  await transporter.sendMail({
    from: `Omkar Pasalkar 👻 <${process.env.gmail_id}>`,
    to: `${process.env.gmail_id}`,
    subject: `${user.fullName} has registered with us`,
    text: `Please welcome ${user.fullName}`,
  });
};

module.exports = { sendMail, sendMailToAdmins, sendOTP };
