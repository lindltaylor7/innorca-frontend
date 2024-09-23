
const { SperantV3 } = require('../../services/sperant')
const Sperant = new SperantV3()

class BanksController {
  static listBanks = async (req, res, next) => {
    try {
      const banks = await Sperant.getBanks()

      return res.json({
        ok: true,
        banks: banks,
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = BanksController
