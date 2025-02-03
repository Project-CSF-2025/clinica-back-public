const db = require('../config/database');

const MessagesModel = {
    createMessage: (messageData, callback) => {
        const query = `INSERT INTO messages (id_report, sender_type, message_content, is_read) 
                       VALUES (?, ?, ?, ?)`;
        const { id_report, sender_type, message_content, is_read } = messageData;

        db.query(query, [id_report, sender_type, message_content, is_read || false], callback);
    },

    getMessagesByReportId: (reportId, callback) => {
        const query = `SELECT * FROM messages WHERE id_report = ? ORDER BY created_at ASC`;
        db.query(query, [reportId], callback);
    }
};

module.exports = MessagesModel;
