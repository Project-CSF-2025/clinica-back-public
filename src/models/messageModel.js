const db = require('../config/database');

const MessagesModel = {
  async createMessage(messageData) {
    const query = `
      INSERT INTO messages (id_report, sender_type, message_content, is_read, created_at) 
      VALUES (?, ?, ?, ?, NOW())`;

    const { id_report, sender_type, message_content, is_read } = messageData;

    const result = await new Promise((resolve, reject) => {
      db.query(query, [id_report, sender_type, message_content, is_read || false], (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });

    return { insertId: result.insertId };
  },

  async getMessagesByReportId(id_report) {
    const query = `SELECT id_message, sender_type, message_content, is_read, created_at 
                   FROM messages WHERE id_report = ? ORDER BY created_at ASC`;

    const results = await new Promise((resolve, reject) => {
      db.query(query, [id_report], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });

    return results;
  },

  async deleteMessage(id_message) {
    const query = `DELETE FROM messages WHERE id_message = ?`;

    const result = await new Promise((resolve, reject) => {
      db.query(query, [id_message], (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });

    return result.affectedRows > 0;
  },

  async markMessagesAsRead(reportId) {
    const query = `UPDATE messages SET is_read = true WHERE id_report = ? AND sender_type = 'user'`;

    await new Promise((resolve, reject) => {
      db.query(query, [reportId], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },

  async markAdminMessagesAsRead(id_report) {
    const query = `
      UPDATE messages 
      SET is_read = true 
      WHERE id_report = ? AND sender_type = 'admin'
    `;

    await new Promise((resolve, reject) => {
      db.query(query, [id_report], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
};

module.exports = MessagesModel;
