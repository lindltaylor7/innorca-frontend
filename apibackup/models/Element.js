const mongoose = require('mongoose');

const elementSchema = new mongoose.Schema({
  index: Number,
  floor: Number,
  item: String,
  crushedStone: Number,
  grossSand: Number,
  fineSand: Number,
  cement: Number,
  water: Number,
  wire16: Number,
  wire8: Number,
  reforceSteel: Number,
  nail: Number,
  largeStone: Number,
  gravel: Number,
  roofBrick: Number,
  brick: Number,
  turpentine: Number,
  sandpaper: Number,
  sealer: Number,
  paint: Number   
}, { timestamps: true });

const Element = mongoose.model('Element', elementSchema);

module.exports = Element;
