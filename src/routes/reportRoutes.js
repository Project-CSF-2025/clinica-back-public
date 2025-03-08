const express = require('express');
const multer = require("multer");
const path = require("path");
const ReportController = require('../controllers/reportController');

const router = express.Router();

router.post('/', ReportController.createReport);
router.get('/', ReportController.getAllReports);
router.get('/:report_code', ReportController.getReportByCode);
router.post('/:id_report', ReportController.updateReport);
router.delete('/:id_report', ReportController.deleteReport);

module.exports = router;
