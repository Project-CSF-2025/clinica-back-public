const MessageService = require('../services/messageService');
const UserModel = require('../models/userModel');
const EmailNotificationService = require('../services/emailNotificationService');

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
      
          const { id_report, sender_type, message_content } = req.body;
      
          // ✅ Notify only if sender is admin
          if (sender_type === 'admin') {
            const user = await UserModel.findByReportId(id_report);
      
            if (user?.email && user.email !== 'anonymous@clinica.com') {
              // 🔍 Fetch report_code using id_report
              const ReportModel = require('../models/reportModel'); // Add at top if not already
              const report = await ReportModel.getReportById(id_report);
      
              if (report?.report_code) {
                await EmailNotificationService.sendAdminMessage(
                  user.email,
                  message_content,
                  report.report_code
                );
                console.log("📧 Notification sent to:", user.email);
              } else {
                console.warn("⚠️ Report not found or missing code.");
              }
            } else {
              console.log("⚠️ No valid user email found or it's anonymous.");
            }
          }
      
          res.status(201).json(newMessage);
        } catch (error) {
          console.error("❌ Message creation or email notification failed:", error);
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
