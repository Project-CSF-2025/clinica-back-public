const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Route to create a new report
router.post('/', reportController.createReport);

// Route to get a report by its code
router.get('/:reportCode', reportController.getReportByCode);

module.exports = router;
