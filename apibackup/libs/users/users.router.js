const express = require('express')
const router = express.Router()

const passport = require('../../config/passport')
const { uploadSingle } = require('../../middlewares/s3-upload')
const { isMenorcaClient } = require('../../middlewares/isMenorcaClient')

const RequestsController = require('./requests/requests.controller')
const ReferencesController = require('./references/references.controller')

router.use(passport.isAuthenticated)
router.get('/consultas/crear', RequestsController.renderCreateRequest)
router.post('/consultas/crear', uploadSingle.single('file'), RequestsController.createRequest);

router.get('/referir', isMenorcaClient, ReferencesController.renderCreateReferral)
router.post('/referir', isMenorcaClient, ReferencesController.createReferral)

module.exports = router