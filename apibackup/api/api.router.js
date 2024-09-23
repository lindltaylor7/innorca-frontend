const express = require('express')
const router = express.Router()

const PaymentsRouter = require('./payments/payments.router')
const ProjectsRouter = require('./projects/projects.router')
const BanksRouter = require('./banks/banks.router')
const CIPsRouter = require('./cips/cips.router')
const ExchangeRatesRouter = require('./exchangeRates/exchangeRates.router')
const MetricsRouter = require('./metrics/metrics.router')
const WebhooksRouter = require('./webhooks/webhooks.router')

const passport = require('../config/passport')

router.use('/webhooks', WebhooksRouter)

/*router.use(passport.isAuthenticated)
router.use('/payments', PaymentsRouter)
router.use('/projects', ProjectsRouter)
router.use('/banks', BanksRouter)
router.use('/cips', CIPsRouter)
router.use('/exchangeRates', ExchangeRatesRouter)
router.use('/metrics', MetricsRouter)*/

module.exports = router
