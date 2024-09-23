const express = require('express')
const router = express.Router()

const passport = require('../../config/passport')
const accessConfig = require('../../config/access')

const ReferencesController = require('./references/references.controller')

router.use(passport.isAuthenticated)
router.use(accessConfig.isAdmin)
router.get('/referencias', ReferencesController.listReferences);

module.exports = router