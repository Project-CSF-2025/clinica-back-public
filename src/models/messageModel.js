const db = require('../config/database');

const MessagesModel = {
    async createMessage(messageData) {
        const query = `
            INSERT INTO messages (id_report, sender_type, message_content, is_read, created_at) 
            VALUES (?, ?, ?, ?, NOW())`;
        
        const { id_report, sender_type, message_content, is_read } = messageData;

        const [result] = await db.promise().query(query, [id_report, sender_type, message_content, is_read || false]);
        return { insertId: result.insertId };
    },

    async getMessagesByReportId(id_report) {
        const query = `SELECT id_message, sender_type, message_content, is_read, created_at 
                       FROM messages WHERE id_report = ? ORDER BY created_at ASC`;

        const [results] = await db.promise().query(query, [id_report]);
        return results;
    },

    async deleteMessage(id_message) {
        const query = `DELETE FROM messages WHERE id_message = ?`;

        const [result] = await db.promise().query(query, [id_message]);
        return result.affectedRows > 0; // Return true if deleted, false if not found
    }
};

module.exports = MessagesModel;
