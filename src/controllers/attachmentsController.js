const AttachmentsModel = require('../models/attachmentsModel');

exports.createAttachment = (req, res) => {
    const { id_report, attachment_type, file_path } = req.body;

    if (!id_report || !attachment_type || !file_path) {
        return res.status(400).json({ message: 'Required fields are missing' });
    }

    AttachmentsModel.createAttachment({ id_report, attachment_type, file_path }, (err, result) => {
        if (err) {
            console.error('Error uploading attachment:', err);
            return res.status(500).json({ message: 'Failed to upload attachment' });
        }

        res.status(201).json({ message: 'Attachment uploaded successfully', attachmentId: result.insertId });
    });
};

exports.getAttachmentsByReport = (req, res) => {
    const reportId = req.params.reportId;

    AttachmentsModel.getAttachmentsByReportId(reportId, (err, results) => {
        if (err) {
            console.error('Error fetching attachments:', err);
            return res.status(500).json({ message: 'Failed to fetch attachments' });
        }

        res.status(200).json(results);
    });
};
