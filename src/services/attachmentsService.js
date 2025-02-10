const AttachmentsModel = require('../models/attachmentsModel');

const AttachmentService = {
    async createAttachment(attachmentData) {
        return await AttachmentsModel.createAttachment(attachmentData);
    },

    async getAttachmentsByReportId(reportId) {
        const attachments = await AttachmentsModel.getAttachmentsByReportId(reportId);
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
