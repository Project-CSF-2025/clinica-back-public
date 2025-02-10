const CreateMessageDTO = require('../dtos/createMessage.dto');
const MessageService = require('../services/messagesService');

const MessagesController = {
    async createMessage(req, res) {
        try {
            const messageData = new CreateMessageDTO(req.body);

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
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = MessagesController;
