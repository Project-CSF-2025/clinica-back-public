const MessagesModel = require('../models/messagesModel');

const MessageService = {
    async createMessage(messageData) {
        return await MessagesModel.createMessage(messageData);
    },

    async getMessagesByReportId(reportId) {
        const messages = await MessagesModel.getMessagesByReportId(reportId);
        if (!messages.length) {
            throw new Error('No messages found for this report');
        }
        return messages;
    },

    async updateMessage(messageId, updateData) {
        return await MessagesModel.updateMessage(messageId, updateData);
    },

    async deleteMessage(messageId) {
        return await MessagesModel.deleteMessage(messageId);
    }
};

module.exports = MessageService;
