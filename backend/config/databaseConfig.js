const mongoose = require("mongoose");
require("dotenv").config();
const connection = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL);
    if (conn) {
      console.log("Database connected");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = connection;
