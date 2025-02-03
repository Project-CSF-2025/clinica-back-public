const express = require('express');
const router = express.Router();
const reportStatusHistoryController = require('../controllers/reportStatusHistoryController');

// Routes for report status history
router.get('/:id_report', reportStatusHistoryController.getStatusHistory);
router.post('/', reportStatusHistoryController.addStatusHistory);

module.exports = router;
