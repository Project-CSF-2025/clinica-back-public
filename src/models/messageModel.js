const { sql, pool } = require('../config/database');

const MessagesModel = {
  async createMessage(messageData) {
    const { id_report, sender_type, message_content, is_read = false } = messageData;

    const query = `
      INSERT INTO messages (id_report, sender_type, message_content, is_read, created_at)
      OUTPUT INSERTED.id_message
      VALUES (@id_report, @sender_type, @message_content, @is_read, GETDATE())`;

    const request = pool.request();
    request.input('id_report', sql.Int, id_report);
    request.input('sender_type', sql.VarChar, sender_type);
    request.input('message_content', sql.Text, message_content);
    request.input('is_read', sql.Bit, is_read);

    const result = await request.query(query);
    return { insertId: result.recordset[0].id_message };
  },

  async getMessagesByReportId(id_report) {
    const query = `
      SELECT id_message, sender_type, message_content, is_read, created_at
      FROM messages
      WHERE id_report = @id_report
      ORDER BY created_at ASC`;

    const request = pool.request();
    request.input('id_report', sql.Int, id_report);

    const result = await request.query(query);
    return result.recordset;
  },

  async deleteMessage(id_message) {
    const query = `DELETE FROM messages WHERE id_message = @id_message`;

    const request = pool.request();
    request.input('id_message', sql.Int, id_message);

    const result = await request.query(query);
    return result.rowsAffected[0] > 0;
  },

  async markMessagesAsRead(reportId) {
    const query = `
      UPDATE messages
      SET is_read = 1
      WHERE id_report = @reportId AND sender_type = 'user'`;

    const request = pool.request();
    request.input('reportId', sql.Int, reportId);

    await request.query(query);
  },

  async markAdminMessagesAsRead(id_report) {
    const query = `
      UPDATE messages
      SET is_read = 1
      WHERE id_report = @id_report AND sender_type = 'admin'`;

    const request = pool.request();
    request.input('id_report', sql.Int, id_report);

    await request.query(query);
  }
};

module.exports = MessagesModel;
