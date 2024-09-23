const { Schema, model } = require('mongoose')

const frequentQuestionSchema = new Schema({
  question: { type: String },
  answer: { type: String },
  order: { type: Number },
  category: { type: Schema.Types.ObjectId, ref: 'QuestionCategory' },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'QuestionCategory'
  }],
  subcategories: [{
    type: Schema.Types.ObjectId,
    ref: 'QuestionSubcategory'
  }]
}, { timestamps: true })

const FrequentQuestion = model('FrequentQuestion', frequentQuestionSchema)

module.exports = FrequentQuestion