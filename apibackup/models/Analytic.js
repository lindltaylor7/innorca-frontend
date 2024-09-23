const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  rawData: { type: Object },
  type: String,
}, { timestamps: true });

const Analytic = mongoose.model('Analytic', requestSchema);

module.exports = Analytic;
