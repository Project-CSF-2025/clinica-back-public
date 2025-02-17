const AttachmentService = require('../services/attachmentService');

const AttachmentController = {
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
            if (!attachments.length) {
                return res.status(404).json({ error: 'No attachments found for this report' });
            }
            res.json(attachments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateAttachment(req, res) {
        try {
            const { id } = req.params;
            const updatedAttachment = await AttachmentService.updateAttachment(id, req.body);
            res.json(updatedAttachment);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteAttachment(req, res) {
        try {
            const { id } = req.params;
            await AttachmentService.deleteAttachment(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = AttachmentController;
