const express = require('express');

const router = express.Router();

const WebhooksController = require('./webhooks.controller');

// router.post('/sperant/status-change', WebhooksController.changeStatus)

router.post('/sperant/ticket/status-change', WebhooksController.changeTicketStatus);

module.exports = router;
