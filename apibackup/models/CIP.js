const { Schema, model } = require('mongoose')

const CIPSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  code: String,
  budgetCode: String,
  paymentId: String,
  paymentType: String,
  cipId: String,
  type: String,
  cip: String,
  cipUrl: String,
  quantity: Number,
  exchangeRate: Number,
  payAmount: String,
  formattedPayAmount: String,
  paymentIn: String,
  expiresAt: String,
  formattedExpiresAt: String,
}, { timestamps: true })

const CIP = model('CIP', CIPSchema)

module.exports = CIP