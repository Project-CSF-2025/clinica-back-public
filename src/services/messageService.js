const MessageModel = require('../models/messageModel');

const MessageService = {
    async createMessage(messageData) {
        return await MessageModel.createMessage(messageData);
    },

    async getMessagesByReportId(reportId) {
        const messages = await MessageModel.getMessagesByReportId(reportId);
        return Array.isArray(messages) ? messages : [];
    },    

    async updateMessage(messageId, updateData) {
        return await MessageModel.updateMessage(messageId, updateData);
    },

    async deleteMessage(messageId) {
        return await MessageModel.deleteMessage(messageId);
    },

    async markMessagesAsRead(reportId) {
        return await MessageModel.markMessagesAsRead(reportId);
    },

    async markAdminMessagesAsRead(reportId) {
        return await MessageModel.markAdminMessagesAsRead(reportId);
    }

      
};

module.exports = MessageService;
