const ExchangeRate = require('../../models/ExchangeRate')

const { SperantV3 } = require('../../services/sperant')
const Sperant = new SperantV3()

const CIP = require('../../models/CIP')

class CIPsController {
  static createCIP = async (req, res, next) => {
    try {
      const { body } = req

      if (body.paymentType == 'Payment' && body.currency != 'PEN') {
        return res.status(400).json({
          ok: false,
          msg: 'Invalid currency'
        })
      }

      let exchangeRate = 1
      if (body.paymentType == 'Quota' && body.currency == 'PEN') {
        const exchangeRateDB = await ExchangeRate.findOne({ name: 'actual' })
        if (!exchangeRateDB) {
          return res.json({
            ok: false,
            msg: 'Exchange rate not found, contact with admin'
          })
        }

        exchangeRate = exchangeRateDB.value
      }

      const cip = await Sperant.postCreateCIP(
        body.paymentId,
        body.paymentType,
        body.saldo,
        exchangeRate,
        body.currency,
        // req.user.profile.sperantEmail,
        'xamay56756@hype68.com',
        0,
      )

      const cipDb = await CIP.create({
        user: req.user.id,
        cipId: cip.id,
        code: cip.code,
        budgetCode: body.budgetCode,
        paymentId: cip.paymentId,
        paymentType: cip.paymentType,
        type: cip.type,
        cip: cip.cip,
        cipUrl: cip.cipUrl,
        quantity: body.quantity,
        exchangeRate: exchangeRate,
        payAmount: cip.payAmount,
        formattedPayAmount: cip.formattedPayAmount,
        paymentIn: cip.paymentIn,
        expiresAt: cip.expiresAt,
        formattedExpiresAt: cip.formattedExpiresAt,
      })

      return res.json({
        ok: true,
        cip: cipDb,
      })
    } catch (error) {
      console.log(error.response)
      next(error)
    }
  }

  static getCIP = async (req, res, next) => {
    try {
      const { params } = req
      const cipDB = await CIP.findOne({ budgetCode: params.id, user: req.user._id })

      return res.json({
        ok: true,
        cip: cipDB,
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CIPsController
