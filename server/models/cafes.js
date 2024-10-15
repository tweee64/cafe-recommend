const mongoose = require("mongoose");

const cafeSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
});

const cafeModel = mongoose.model("Cafe", cafeSchema);

module.exports = cafeModel;
