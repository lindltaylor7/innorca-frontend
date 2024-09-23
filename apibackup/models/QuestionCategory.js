const { Schema, model } = require('mongoose')

const questionCategorySchema = new Schema({
  name: { type: String },
  subcategories: [{
    type: Schema.Types.ObjectId,
    ref: 'QuestionSubcategory'
  }]
}, { timestamps: true })

const QuestionCategory = model('QuestionCategory', questionCategorySchema)

module.exports = QuestionCategory