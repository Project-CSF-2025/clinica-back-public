const express = require('express');
const ReportStatusHistoryController = require('../controllers/reportStatusHistoryController');

const router = express.Router();

router.post('/', ReportStatusHistoryController.addStatusChange);
router.get('/:id_report', ReportStatusHistoryController.getStatusHistoryByReportId);

module.exports = router;
