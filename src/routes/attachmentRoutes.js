const express = require('express');
const AttachmentController = require('../controllers/attachmentController');

const router = express.Router();

router.get('/:reportId', AttachmentController.getAttachmentsByReportId);
router.post('/', AttachmentController.createAttachment);
router.put('/:id', AttachmentController.updateAttachment);
router.delete('/:id', AttachmentController.deleteAttachment);

module.exports = router;
