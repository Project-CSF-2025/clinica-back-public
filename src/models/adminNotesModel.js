const db = require('../config/database');

const AdminNotesModel = {
    async createNote(noteData) {
        const query = `INSERT INTO admin_notes (id_report, admin_message) VALUES (?, ?)`;
        const { id_report, admin_message } = noteData;

        const [result] = await db.promise().query(query, [id_report, admin_message]);
        return result;
    },

    async getNotesByReportId(reportId) {
        const query = `SELECT * FROM admin_notes WHERE id_report = ?`;

        const [results] = await db.promise().query(query, [reportId]);
        return results;
    },

    async updateNote(noteId, updateData) {
        const query = `UPDATE admin_notes SET admin_message = ? WHERE id = ?`;
        const { admin_message } = updateData;

        const [result] = await db.promise().query(query, [admin_message, noteId]);
        return result;
    },

    async deleteNote(noteId) {
        const query = `DELETE FROM admin_notes WHERE id = ?`;

        const [result] = await db.promise().query(query, [noteId]);
        return result;
    }
};

module.exports = AdminNotesModel;
