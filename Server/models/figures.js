const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const figureSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  producer: { type: String, required: true, maxlength: 100 },
  copies: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  cover: { type: String, required: true },
  route: { type: String, required: true },
});
module.exports = mongoose.model("Figure", figureSchema);
