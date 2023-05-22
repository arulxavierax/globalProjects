const { Schema, model } = require("mongoose");

const citySchema = new Schema({
  city: { type: String },
});

const Cities = model("city", citySchema);

module.exports = Cities;
