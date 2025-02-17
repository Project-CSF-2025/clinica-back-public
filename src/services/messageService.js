const MessageModel = require('../models/messageModel');

const MessageService = {
    async createMessage(messageData) {
        return await MessageModel.createMessage(messageData);
    },

    async getMessagesByReportId(reportId) {
        const messages = await MessageModel.getMessagesByReportId(reportId);
        if (!messages.length) {
            throw new Error('No messages found for this report');
        }
        return messages;
    },

    async updateMessage(messageId, updateData) {
        return await MessageModel.updateMessage(messageId, updateData);
    },

    async deleteMessage(messageId) {
        return await MessageModel.deleteMessage(messageId);
    }
};

module.exports = MessageService;
