const express = require('express')
const router = express.Router()

const ProjectsController = require('./projects.controller')

router.get('/:id', ProjectsController.showProject)

module.exports = router