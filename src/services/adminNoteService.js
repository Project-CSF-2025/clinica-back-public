const AdminNoteModel = require('../models/adminNoteModel');

const AdminNoteService = {
    async createNote(noteData) {
        return await AdminNoteModel.createNote(noteData);
    },

    async getNotesByReportId(reportId) {
        return await AdminNoteModel.getNotesByReportId(reportId);
    },

    async updateNote(noteId, updateData) {
        return await AdminNoteModel.updateNote(noteId, updateData);
    },

    async deleteNote(noteId) {
        return await AdminNoteModel.deleteNote(noteId);
    }
};

module.exports = AdminNoteService;
