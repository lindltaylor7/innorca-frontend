const { Schema, model } = require('mongoose')

const questionAnswerRating = new Schema({
  frequentQuestion: { type: Schema.Types.ObjectId, ref: 'FrequentQuestion' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number },
}, { timestamps: true })

questionAnswerRating.index({ frequentQuestion: 1, user: 1 }, {unique: true}); // schema level

const QuestionAnswerRating = model('QuestionAnswerRating', questionAnswerRating)

module.exports = QuestionAnswerRating