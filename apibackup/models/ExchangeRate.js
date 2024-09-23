const { Schema, model } = require('mongoose')

const exchangeRatechema = new Schema({
  name: { type: String, default: 'actual' },
  value: { type: Number, required: true }
}, { timestamps: true })

const ExchangeRate = model('ExchangeRate', exchangeRatechema)

module.exports = ExchangeRate