const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');

router.post('/', messagesController.createMessage);
router.get('/:reportId', messagesController.getMessagesByReport);

module.exports = router;
