const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const lightnovelSchema = new Schema({
  title: { type: String, required: true, maxlength: 100 },
  publisher: { type: String, required: true, maxlength: 100 },
  volumes: { type: Number, required: true, min: 1 },
  copies: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  cover: { type: String },
  route: { type: String, require: true },
  sinopsis: { type: String, require: true },
});
module.exports = mongoose.model("Light-Novel", lightnovelSchema);
