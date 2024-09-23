const express = require('express')
const router = express.Router()

const ExchangeRatesController = require('./exchangeRates.controller')

router.get('/:id', ExchangeRatesController.getActualExchangeRate)

module.exports = router