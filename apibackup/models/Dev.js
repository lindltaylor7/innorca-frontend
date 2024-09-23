const { Schema, model } = require('mongoose')

const devSchema = new Schema({
  dev: String,
  enabled: false
}, { timestamps: false })

const Dev = model('Dev', devSchema)

module.exports = Dev