const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  email: String,
  nameProject: String,
  detail: String,
  category: String 
}, { timestamps: true });

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
