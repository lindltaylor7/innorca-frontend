const express = require('express')
const router = express.Router()

const CIPsController = require('./cips.controller')

router.post('/', CIPsController.createCIP)
router.get('/:id', CIPsController.getCIP)

module.exports = router