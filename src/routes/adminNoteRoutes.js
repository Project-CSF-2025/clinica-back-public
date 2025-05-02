const express = require('express');
const AdminNoteController = require('../controllers/adminNoteController'); // Ensure singular

const router = express.Router();

router.get("/", AdminNoteController.getAllAdminNotes); 
router.get('/:id_report', AdminNoteController.getAdminNoteByReportId);
router.post('/', AdminNoteController.createNote);
router.put('/:id', AdminNoteController.updateNote);
router.delete('/:id', AdminNoteController.deleteNote);
router.put('/:id/delete', AdminNoteController.softDeleteNote);
router.put('/:id/delete', AdminNoteController.softDeleteNote);


module.exports = router;
