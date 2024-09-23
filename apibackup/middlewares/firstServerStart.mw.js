const QuestionCategory = require('../models/QuestionCategory')
const Referred = require('../models/Referred')
const ReferredStatus = require('../models/ReferredStatus')

const initQuestionsCategoryMw = async (_req, _res, next) => {
  try {
    const count = await QuestionCategory.countDocuments();
    if (count === 0) {
      await QuestionCategory.create({ name: 'default' })
    }

    // const referreds = await Referred.find({})

    // for (let index = 0; index < referreds.length; index++) {
    //   const referred = referreds[index]

    //   const ref = await Referred.findById(referred._id)
    //   ref.projectList = [ref.projectId]
    //   await ref.save()
    // }
    
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = { initQuestionsCategoryMw }