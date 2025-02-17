const AdminNotesModel = require('../models/adminNotesModel');

const AdminNotesService = {
    async createNote(noteData) {
        return await AdminNotesModel.createNote(noteData);
    },

    async getNotesByReportId(reportId) {
        const notes = await AdminNotesModel.getNotesByReportId(reportId);
        if (!notes.length) {
            throw new Error('No admin notes found for this report');
        }
        return notes;
    },

    async updateNote(noteId, updateData) {
        return await AdminNotesModel.updateNote(noteId, updateData);
    },

    async deleteNote(noteId) {
        return await AdminNotesModel.deleteNote(noteId);
    }
};

module.exports = AdminNotesService;
