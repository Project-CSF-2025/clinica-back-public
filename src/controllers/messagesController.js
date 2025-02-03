const MessagesModel = require('../models/messagesModel');

exports.createMessage = (req, res) => {
    const { id_report, sender_type, message_content, is_read } = req.body;

    if (!id_report || !sender_type || !message_content) {
        return res.status(400).json({ message: 'Required fields are missing' });
    }

    MessagesModel.createMessage({ id_report, sender_type, message_content, is_read }, (err, result) => {
        if (err) {
            console.error('Error creating message:', err);
            return res.status(500).json({ message: 'Failed to create message' });
        }

        res.status(201).json({ message: 'Message sent successfully', messageId: result.insertId });
    });
};

exports.getMessagesByReport = (req, res) => {
    const reportId = req.params.reportId;

    MessagesModel.getMessagesByReportId(reportId, (err, results) => {
        if (err) {
            console.error('Error fetching messages:', err);
            return res.status(500).json({ message: 'Failed to fetch messages' });
        }

        res.status(200).json(results);
    });
};
