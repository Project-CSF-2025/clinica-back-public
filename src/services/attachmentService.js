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
    },

    async updateAttachment(attachmentId, updateData) {
        return await AttachmentsModel.updateAttachment(attachmentId, updateData);
    },

    async deleteAttachment(attachmentId) {
        return await AttachmentsModel.deleteAttachment(attachmentId);
    }
};

module.exports = AttachmentService;
