const express = require('express')
const router = express.Router()

const PaymentsController = require('./payments.controller')

router.get('/', PaymentsController.listBudgetPayments)

module.exports = router