const { Schema, model } = require('mongoose')

const questionSubcategorySchema = new Schema({
  name: { type: String },
  questionCategory: { type: Schema.Types.ObjectId, ref: 'QuestionCategory' },
}, { timestamps: true })

const QuestionSubcategory = model('QuestionSubcategory', questionSubcategorySchema)

module.exports = QuestionSubcategory