const User = require('../models/User')

const { SperantV3 } = require('../services/sperant')
const Sperant = new SperantV3()

const updateUserData = async (req, _res, next) => {
  try {
    if (req.user) {
      if (req.user.type == 1) {
        if (!req.user.profile.sperantClientId) {
          console.log('add sperant clientId');
          const client = await Sperant.getShortenedSperantClient(req.user.profile.document)
          await User.findByIdAndUpdate(
            req.user._id,
            { 'profile.sperantClientId': client.id }
          )
        }
      }
    }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  updateUserData: updateUserData,
}