const db = require('../config/database');

const AttachmentsModel = {
    createAttachment: (attachmentData, callback) => {
        const query = `INSERT INTO attachments (id_report, attachment_type, file_path) 
                       VALUES (?, ?, ?)`;

        const { id_report, attachment_type, file_path } = attachmentData;

        db.query(query, [id_report, attachment_type, file_path], callback);
    },

    getAttachmentsByReportId: (reportId, callback) => {
        const query = `SELECT * FROM attachments WHERE id_report = ?`;
        db.query(query, [reportId], callback);
    }
};

module.exports = AttachmentsModel;
