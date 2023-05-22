const mongoose = require("mongoose");

const dbConnect = () => {
  return mongoose.connect(
    "mongodb+srv://arulxavier2121:hr_portal@cluster0.x44cwqe.mongodb.net/?retryWrites=true&w=majority"
  );
};

module.exports = dbConnect;
