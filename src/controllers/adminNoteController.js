const AdminNoteService = require('../services/adminNoteService'); // Ensure singular name

const AdminNoteController = {
    async getNotesByReportId(req, res) {
        try {
            const notes = await AdminNoteService.getNotesByReportId(req.params.reportId);
            if (!notes.length) {
                return res.status(404).json({ error: 'No notes found for this report' });
            }
            res.json(notes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    async createNote(req, res) {
        try {
            const newNote = await AdminNoteService.createNote(req.body);
            res.status(201).json(newNote);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },

    async updateNote(req, res) {
        try {
            const updatedNote = await AdminNoteService.updateNote(req.params.id, req.body);
            res.json(updatedNote);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },

    async deleteNote(req, res) {
        try {
            await AdminNoteService.deleteNote(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = AdminNoteController;
