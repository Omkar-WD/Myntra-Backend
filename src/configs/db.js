require("dotenv").config();
const mongoose = require("mongoose");
module.exports = () => {
  return mongoose.connect(
		process.env.Database
  );
};
