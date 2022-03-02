require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
      if (err) return reject(err);

      resolve(user);
    });
  });
};

module.exports = async (req, res, next) => {
  if (!req.params) {
    return next();
  }
  if (!req.headers.authorization)
    return res.status(400).send({
      message: "authorization token was not provided or was not valid 1",
    });
  if (!req.headers.authorization.startsWith("Bearer "))
    return res.status(400).send({
      message: "authorization token was not provided or was not valid 2",
    });
  const token = req.headers.authorization.split(" ")[1];
  let user;
  try {
    user = await verifyToken(token);
  } catch (err) {
    return res.status(400).send({
      message: "authorization token was not provided or was not valid 3",
    });
  }
  // console.log("request:", req.body);
  req.body.userId = user.user._id;
  // console.log("authenticate:", req.body);

  return next();
};
