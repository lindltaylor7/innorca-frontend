const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  rawData: { type: Object }
}, { timestamps: true });

const Webhooks = mongoose.model('Webhooks', requestSchema);

module.exports = Webhooks;
