const AdminNotesService = require('../services/adminNotesService');

const AdminNotesController = {
    async createNote(req, res) {
        try {
            const newNote = await AdminNotesService.createNote(req.body);
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
            res.status(404).json({ error: error.message });
        }
    }
};
