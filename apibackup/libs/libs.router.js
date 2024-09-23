const express = require('express')
const router = express.Router()

const UserRouter = require('./users/users.router')
const MetricsRouter = require('./metrics/metrics.router')
const AdminRouter = require('./admin/admin.router')

router.use('/', UserRouter)
router.use('/metricas', MetricsRouter)
router.use('/admin', AdminRouter)

module.exports = router