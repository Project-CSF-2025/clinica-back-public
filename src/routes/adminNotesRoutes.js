const express = require('express');
const router = express.Router();
const adminNotesController = require('../controllers/adminNotesController');

// Routes for admin notes
router.post('/', adminNotesController.createNote); // Add a new admin note
router.get('/:reportId', adminNotesController.getNotesByReport); // Get notes for a report

module.exports = router;
