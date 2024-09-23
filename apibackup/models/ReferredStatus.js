const mongoose = require('mongoose');

const referredStatusSchema = new mongoose.Schema({
  eventName: {
    type: String,
    enum: [
      'pending',
      'deposit_payment_created',
      'deposit_financial_created',
      'process_separation_created',
      'process_sale_completed',
      'process_canceled_created',
      'reserv_created',
      'reserv_canceled',
    ],
    default: 'pending'
  },
}, { timestamps: { createdAt: true, updatedAt: false }, versionKey: false });

const ReferredStatus = mongoose.model('ReferredStatus', referredStatusSchema);

module.exports = ReferredStatus;
