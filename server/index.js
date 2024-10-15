const express = require("express");
const connectDB = require("./db.js");
const itemModel = require("./models/items.js");
const cafeModel = require("./models/cafes.js");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
connectDB();
app.get("/", async (req, res) => {
  const response = await itemModel.find();
  //   const cafes = await cafeModel.find();
  console.log("cafes", response);
  return res.json({ items: response });
});
app.listen(3000, () => {
  console.log("app is running");
});
