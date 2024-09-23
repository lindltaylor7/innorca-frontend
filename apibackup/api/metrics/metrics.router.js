const express = require('express')
const router = express.Router()

const MetricsController = require('./metrics.controller.js')

router.get('/', MetricsController.listGeneralMetrics)
router.get('/requests', MetricsController.listRequestsMetrics)

module.exports = router