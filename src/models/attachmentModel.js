const { sql, pool } = require('../config/database');

const AttachmentModel = {
  async createAttachment({ id_report, attachment_type, file_path }) {
    try {
      const query = `
        INSERT INTO Attachments (id_report, attachment_type, file_path)
        OUTPUT INSERTED.*
        VALUES (@id_report, @attachment_type, @file_path)
      `;
      const request = pool.request();
      request.input('id_report', sql.Int, id_report);
      request.input('attachment_type', sql.VarChar, attachment_type);
      request.input('file_path', sql.VarChar, file_path);

      const result = await request.query(query);
      return result.recordset[0];
    } catch (error) {
      console.error("❌ Error in createAttachment model:", error);
      throw error;
    }
  },

  async getAttachmentsByReportId(id_report) {
    try {
      const query = `SELECT * FROM Attachments WHERE id_report = @id_report`;
      const request = pool.request();
      request.input('id_report', sql.Int, id_report);
      const result = await request.query(query);
      return result.recordset;
    } catch (error) {
      console.error("❌ Error in getAttachmentsByReportId model:", error);
      throw error;
    }
  }
};

module.exports = AttachmentModel;
