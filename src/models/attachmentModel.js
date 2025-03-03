const db = require('../config/database');

const AttachmentModel = {
    async createAttachment(attachmentData) {
        const query = `
          INSERT INTO attachments (id_report, attachment_type, file_path)
          VALUES (?, ?, ?)`;
    
        const values = [
          attachmentData.id_report,
          attachmentData.attachment_type,
          attachmentData.file_path,
        ];
    
        const [result] = await db.promise().query(query, values);
        return { insertId: result.insertId, ...attachmentData };
      },

    async getAttachmentsByReportId(reportId) {
        const query = `SELECT * FROM attachments WHERE id_report = ?`;

        const [results] = await db.promise().query(query, [reportId]);
        return results;
    },

    async updateAttachment(attachmentId, updateData) {
        const query = `UPDATE attachments SET file_path = ?, attachment_type = ? WHERE id = ?`;
        const { file_path, attachment_type } = updateData;

        const [result] = await db.promise().query(query, [file_path, attachment_type, attachmentId]);
        return result;
    },

    async deleteAttachment(attachmentId) {
        const query = `DELETE FROM attachments WHERE id = ?`;

        const [result] = await db.promise().query(query, [attachmentId]);
        return result;
    }
};

module.exports = AttachmentModel;
