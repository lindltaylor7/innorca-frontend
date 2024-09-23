const mongoose = require('mongoose');

const publicitySchema = new mongoose.Schema({
  image: String,
  //0: no disponible   1:visible
  disponible: {type: Number, default: 0},
  link: String
}, { timestamps: true });

const Publicity = mongoose.model('Publicity', publicitySchema);

module.exports = Publicity;
