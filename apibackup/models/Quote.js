const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    owner: { type: mongoose.Types.ObjectId, ref: 'User' },
    projectType: String,
    startDate: String,
    startProject: { type: Boolean, default: false },
    counseling: { type: Boolean, default: false },
    addresses: [String],
    quoteType: String,
    projects: [{
        location: String,
        roomType: String,
        long: String,
        width: String,
        materials: [{
            index: Number,
            name: String,
            quantity: Number,
            unit: String,
            price: String,
            parcialCost: String
        }],
        totalCost: String,
        totalCostNumber: Number

    }],
    totalCostNumber: Number,
    finalCost: String,
    codeUnit: String,
    quotesNumber: String,
    quoteQuantity: String,
    contractStartDate: String,
    //withDebts: String,
    propertyArea: String,
    complete: String
}, { timestamps: true });

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;