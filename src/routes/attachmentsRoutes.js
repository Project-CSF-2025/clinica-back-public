const express = require('express');
const router = express.Router();
const attachmentsController = require('../controllers/attachmentsController');

// Routes for attachments
router.post('/', attachmentsController.createAttachment); // Add an attachment to a report
router.get('/:reportId', attachmentsController.getAttachmentsByReport); // Get attachments for a report

module.exports = router;
