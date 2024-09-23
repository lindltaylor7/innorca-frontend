const ExchangeRate = require('../../models/ExchangeRate')

class ExchangesRatesController {
  static getActualExchangeRate = async (req, res, next) => {
    try {
      const { params } = req

      const exchangeRateDB = await ExchangeRate.findOne({ name: params.id })

      if (!exchangeRateDB) {
        return res.status(404).json({
          ok: false,
          msg: 'Exchange rate not found, contact with admin'
        })
      }

      return res.json({
        ok: true,
        exchangeRate: exchangeRateDB
      })
    } catch (error) {
      console.log(error.response)
      next(error)
    }
  }
}

module.exports = ExchangesRatesController
