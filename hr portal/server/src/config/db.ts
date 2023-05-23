const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
  return mongoose.connect(
    `mongodb+srv://arulxavier2121:${process.env.PASSWORD}@cluster0.x44cwqe.mongodb.net/?retryWrites=true&w=majority`
  );
};

module.exports = dbConnect;
