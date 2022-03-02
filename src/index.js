require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./configs/db");
const passport = require("./configs/google-oauth");
const jwt = require("jsonwebtoken");

const suggestionCartDataController = require("./controllers/suggetionCartData.controller");
const registerController = require("./controllers/register.controller");
const loginController = require("./controllers/login.controller");
const productController = require("./controllers/product.controller");
const cartController = require("./controllers/cart.controller");
const wishListController = require("./controllers/wishList.controller");
const userController = require("./controllers/user.controller");
const addressController = require("./controllers/address.controller");
const orderHistoryController = require("./controllers/orderHistory.controller");
const paymentOTPController = require("./controllers/paymentOTP.controller");

const authenticate = require("./middlewares/authenticate");

const PORT = process.env.PORT || 2345;
const app = express();

app.use(express.json());
app.use(cors());

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_TOKEN);
};

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  (req, res) => {
    const { user } = req;
    const token = newToken(user);
    res.cookie("user", token);
    console.log(user, token);
    res.redirect(302, "http://127.0.0.1:5501/index.html");
  }
);

app.use("/suggestionCartData", suggestionCartDataController);
app.use("/register", registerController);
app.use("/login", loginController);
app.use("/products", productController);
app.use("/cart", authenticate, cartController);
app.use("/wishList", authenticate, wishListController);
app.use("/user", authenticate, userController);
app.use("/address", authenticate, addressController);
app.use("/orderHistory", authenticate, orderHistoryController);
app.use("/gettingPaymentOTP", authenticate, paymentOTPController);

app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`listening on port ${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});
