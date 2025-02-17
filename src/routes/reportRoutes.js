const express = require('express');
const ReportController = require('../controllers/reportController');

const router = express.Router();

router.get('/', ReportController.getAllReports);
router.get('/:reportCode', ReportController.getReportByCode);
router.post('/', ReportController.createReport);
router.put('/:id_report', ReportController.updateReport);
router.delete('/:id_report', ReportController.deleteReport);

module.exports = router;
