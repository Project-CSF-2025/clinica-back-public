const express = require('express');
const AdminNoteController = require('../controllers/adminNoteController'); // Ensure singular

const router = express.Router();

router.get('/:reportId', AdminNoteController.getNotesByReportId);
router.post('/', AdminNoteController.createNote);
router.put('/:id', AdminNoteController.updateNote);
router.delete('/:id', AdminNoteController.deleteNote);

module.exports = router;
