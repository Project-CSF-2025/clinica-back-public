const db = require('../config/database');

const AdminNotesModel = {
    createNote: (noteData, callback) => {
        const query = `INSERT INTO admin_notes (id_report, admin_message) VALUES (?, ?)`;

        const { id_report, admin_message } = noteData;

        db.query(query, [id_report, admin_message], callback);
    },

    getNotesByReportId: (reportId, callback) => {
        const query = `SELECT * FROM admin_notes WHERE id_report = ?`;
        db.query(query, [reportId], callback);
    }
};

module.exports = AdminNotesModel;
