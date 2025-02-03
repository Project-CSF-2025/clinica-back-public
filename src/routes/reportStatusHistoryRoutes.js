const express = require('express');
const router = express.Router();
const reportStatusHistoryController = require('../controllers/reportStatusHistoryController');

// POST: Add a new status history entry
router.post('/', reportStatusHistoryController.addStatusHistory);

// GET: Get status history for a specific report
router.get('/:id_report', reportStatusHistoryController.getStatusHistory);

module.exports = router;
