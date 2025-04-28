const AdminNoteModel = require('../models/adminNoteModel');

const AdminNoteService = {
    async getAllAdminNotes() {
        return await AdminNoteModel.getAllAdminNotes();
    },    
    async getAdminNoteByReportId(id_report) {
        return await AdminNoteModel.getAdminNoteByReportId(id_report);
    },
    async createNote(noteData) {
        return await AdminNoteModel.createNote(noteData);
    },
    async updateNote(noteId, updateData) {
        return await AdminNoteModel.updateNote(noteId, updateData);
    },
    async deleteNote(noteId) {
        return await AdminNoteModel.deleteNote(noteId);
    }
};

module.exports = AdminNoteService; 
