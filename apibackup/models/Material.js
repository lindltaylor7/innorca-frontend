const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  name: String,
  unit:String,
  price: Number
}, { timestamps: true });

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;