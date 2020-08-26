const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const animeSchema = new Schema({
  title: { type: String, required: true, maxlength: 100 },
  volumes: { type: Number, required: true, min: 1 },
  copies: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  cover: { type: String },
  route: { type: String, required: true },
  sinopsis: { type: String, required: true },
});
module.exports = mongoose.model("Anime", animeSchema);
