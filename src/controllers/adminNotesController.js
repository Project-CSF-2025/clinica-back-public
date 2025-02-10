const CreateAdminNoteDTO = require('../dtos/createAdminNote.dto');
const AdminNotesService = require('../services/adminNotesService');

const AdminNotesController = {
    async createNote(req, res) {
        try {
            const noteData = new CreateAdminNoteDTO(req.body);

            const newNote = await AdminNotesService.createNote(noteData);
            res.status(201).json(newNote);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getNotesByReportId(req, res) {
        try {
            const { reportId } = req.params;

            const notes = await AdminNotesService.getNotesByReportId(reportId);
            res.json(notes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = AdminNotesController;
