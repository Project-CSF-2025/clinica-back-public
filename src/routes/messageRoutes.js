const express = require('express');
const MessageController = require('../controllers/messageController');

const router = express.Router();

router.get('/:reportId', MessageController.getMessagesByReportId);
router.post('/', MessageController.createMessage);
router.put('/:id', MessageController.updateMessage);
router.delete('/:id', MessageController.deleteMessage);

module.exports = router;
