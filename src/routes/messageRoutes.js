const express = require('express');
const MessageController = require('../controllers/messageController');

const router = express.Router();

router.get('/:reportId', MessageController.getMessagesByReportId);
router.post('/', MessageController.createMessage);
router.put('/:id', MessageController.updateMessage);
router.delete('/:id', MessageController.deleteMessage);
router.put("/mark-read/:reportId", MessageController.markMessagesAsRead);
router.put("/mark-read-admin/:report_code", MessageController.markAdminMessagesAsRead);

module.exports = router;
