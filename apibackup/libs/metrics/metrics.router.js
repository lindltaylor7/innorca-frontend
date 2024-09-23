const express = require('express')
const router = express.Router()

const MetricsController = require('./metrics.controller')

const passport = require('../../config/passport')

router.use(passport.isAuthenticated)
router.get('/general', MetricsController.renderGeneralMetrics)
router.get('/consultas', MetricsController.renderRequestMetrics)

module.exports = router