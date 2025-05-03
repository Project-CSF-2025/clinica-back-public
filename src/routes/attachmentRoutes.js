const express = require('express');
const AttachmentController = require('../controllers/attachmentController');
const upload = require('../config/multer');

const router = express.Router();

router.post('/', upload.single('file'), AttachmentController.createAttachment);

router.get('/:reportId', AttachmentController.getAttachmentsByReportId);

module.exports = router;
