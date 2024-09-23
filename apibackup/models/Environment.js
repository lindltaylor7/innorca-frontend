const mongoose = require('mongoose');

const environmentSchema = new mongoose.Schema({
  index: Number,
  side1: Number,
  side2: Number,
  height: Number,
  area: Number,
  areaName: String,
  slab: Number,
  column: Number,
  beam: Number,
  foundation: Number,
  overload: Number,
  lightenedSlab: Number,
  subfloor: Number,
  cementFloor: Number,
  wall: Number,
  plaster: Number,
  paint: Number,
  door: Number,
  window: Number,
  stairs: Number,
}, { timestamps: true });

const Environment = mongoose.model('Environment', environmentSchema);

module.exports = Environment;
