const MessageService = require('../services/messageService');

const MessagesController = {
    async createMessage(req, res) {
        try {
            const messageData = req.body;
            const newMessage = await MessageService.createMessage(messageData);
            res.status(201).json(newMessage);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getMessagesByReportId(req, res) {
        try {
            const { reportId } = req.params;
            const messages = await MessageService.getMessagesByReportId(reportId);
            res.json(messages);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    async updateMessage(req, res) {
        try {
            const messageId = req.params.id;
            const updateData = req.body;
            const updatedMessage = await MessageService.updateMessage(messageId, updateData);
            res.json(updatedMessage);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteMessage(req, res) {
        try {
            const messageId = req.params.id;
            await MessageService.deleteMessage(messageId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = MessagesController;
