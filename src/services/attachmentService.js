const AttachmentModel = require('../models/attachmentModel');

const AttachmentService = {
    async createAttachment(attachmentData) {
        return await AttachmentModel.createAttachment(attachmentData);
    },

    async getAttachmentsByReportId(reportId) {
        const attachments = await AttachmentModel.getAttachmentsByReportId(reportId);
        if (!attachments.length) {
            throw new Error('No attachments found for this report');
        }
        return attachments;
    }
};

module.exports = AttachmentService;
