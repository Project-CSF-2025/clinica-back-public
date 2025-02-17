const MessageService = require('../services/messageService');

const MessageController = {
    async getMessagesByReportId(req, res) {
        try {
            const messages = await MessageService.getMessagesByReportId(req.params.reportId);
            res.json(messages);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async createMessage(req, res) {
        try {
            const newMessage = await MessageService.createMessage(req.body);
            res.status(201).json(newMessage);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async updateMessage(req, res) {
        try {
            const updatedMessage = await MessageService.updateMessage(req.params.id, req.body);
            res.json(updatedMessage);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteMessage(req, res) {
        try {
            await MessageService.deleteMessage(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = MessageController;
