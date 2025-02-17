const express = require('express');
const ReportStatusHistoryController = require('../controllers/reportStatusHistoryController');

const router = express.Router();

router.post('/', ReportStatusHistoryController.addStatusChange);
router.get('/:reportId', ReportStatusHistoryController.getStatusHistoryByReportId);

module.exports = router;
