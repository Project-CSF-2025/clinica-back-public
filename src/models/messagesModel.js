const db = require('../config/database');

const MessagesModel = {
    async createMessage(messageData) {
        const query = `INSERT INTO messages (id_report, sender_type, message_content, is_read) VALUES (?, ?, ?, ?)`;
        const { id_report, sender_type, message_content, is_read } = messageData;

        const [result] = await db.promise().query(query, [id_report, sender_type, message_content, is_read || false]);
        return result;
    },

    async getMessagesByReportId(reportId) {
        const query = `SELECT * FROM messages WHERE id_report = ? ORDER BY created_at ASC`;

        const [results] = await db.promise().query(query, [reportId]);
        return results;
    },

    async updateMessage(messageId, updateData) {
        const query = `UPDATE messages SET message_content = ?, is_read = ? WHERE id = ?`;
        const { message_content, is_read } = updateData;

        const [result] = await db.promise().query(query, [message_content, is_read, messageId]);
        return result;
    },

    async deleteMessage(messageId) {
        const query = `DELETE FROM messages WHERE id = ?`;

        const [result] = await db.promise().query(query, [messageId]);
        return result;
    }
};

module.exports = MessagesModel;
