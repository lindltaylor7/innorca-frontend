const { Schema, model } = require('mongoose')

const metricSchema = new Schema({
  pathName: String,
}, { timestamps: { createdAt: true, updatedAt: false } })

const Metric = model('Metrics', metricSchema)

module.exports = Metric