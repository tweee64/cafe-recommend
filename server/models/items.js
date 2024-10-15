const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String,
  image: String,
});

const itemModel = mongoose.model("Item", itemSchema);

module.exports = itemModel;
