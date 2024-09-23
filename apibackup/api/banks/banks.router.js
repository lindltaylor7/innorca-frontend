const express = require('express')
const router = express.Router()

const BanksController = require('./banks.controller')

router.get('/', BanksController.listBanks)

module.exports = router