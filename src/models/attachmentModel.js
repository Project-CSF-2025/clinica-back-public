const { sql, pool } = require('../config/database');

const AttachmentModel = {
  async createAttachment(attachmentData) {
    const query = `
      INSERT INTO attachments (id_report, attachment_type, file_path, original_name)
      OUTPUT INSERTED.id_attachment
      VALUES (@id_report, @attachment_type, @file_path, @original_name)`;

    const request = pool.request();
    request.input('id_report', sql.Int, attachmentData.id_report);
    request.input('attachment_type', sql.VarChar, attachmentData.attachment_type);
    request.input('file_path', sql.VarChar, attachmentData.file_path);
    request.input('original_name', sql.NVarChar, attachmentData.original_name); 

      const result = await request.query(query);

      return {
        insertId: result.recordset[0].id_attachment,
        ...attachmentData
      };
  },

  async getAttachmentsByReportId(reportId) {
    const query = `SELECT * FROM attachments WHERE id_report = @reportId`;

    const request = pool.request();
    request.input('reportId', sql.Int, reportId);

    const result = await request.query(query);
    return result.recordset;
  },

  async updateAttachment(attachmentId, updateData) {
    const query = `
      UPDATE attachments 
      SET file_path = @file_path, attachment_type = @attachment_type 
      WHERE id_attachment = @attachmentId`;

    const request = pool.request();
    request.input('file_path', sql.VarChar, updateData.file_path);
    request.input('attachment_type', sql.VarChar, updateData.attachment_type);
    request.input('attachmentId', sql.Int, attachmentId);

    const result = await request.query(query);
    return result;
  },

  async deleteAttachment(attachmentId) {
    const query = `DELETE FROM attachments WHERE id_attachment = @attachmentId`;

    const request = pool.request();
    request.input('attachmentId', sql.Int, attachmentId);

    const result = await request.query(query);
    return result;
  }
};

module.exports = AttachmentModel;
