const AttachmentService = require('../services/attachmentsService');

const AttachmentsController = {
    async createAttachment(req, res) {
        try {
            const newAttachment = await AttachmentService.createAttachment(req.body);
            res.status(201).json(newAttachment);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAttachmentsByReportId(req, res) {
        try {
            const { reportId } = req.params;
            const attachments = await AttachmentService.getAttachmentsByReportId(reportId);
            res.json(attachments);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
};
