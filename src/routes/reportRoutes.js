const express = require('express');
const multer = require("multer");
const path = require("path");
const ReportController = require('../controllers/reportController');
const router = express.Router();

router.get('/export', ReportController.exportCSV); 
router.post('/', ReportController.createReport);
router.get('/', ReportController.getAllReports);
router.get('/:report_code', ReportController.getReportByCode); 
router.post('/:id_report', ReportController.updateReport);
router.delete('/:id_report', ReportController.deleteReport);
router.put("/toggle-flag/:id_report", ReportController.toggleFlag);
router.put('/:report_code/status', ReportController.updateReportStatus);

module.exports = router;

