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
    },

    async markMessagesAsRead(req, res) {
      try {
        const reportId = req.params.reportId;
        await MessageService.markMessagesAsRead(reportId);
        res.status(200).json({ message: "Messages marked as read" });
      } catch (error) {
        console.error("❌ Error marking messages as read:", error);
        res.status(500).json({ error: error.message });
      }
    },

    async markAdminMessagesAsRead(req, res) {
      try {
          const { report_code } = req.params;
  
          const ReportModel = require('../models/reportModel');
          const report = await ReportModel.getReportByCode(report_code);
  
          if (!report) return res.status(404).json({ error: "Report not found" });
  
          await MessageService.markAdminMessagesAsRead(report.id_report);
  
          res.json({ message: "Admin messages marked as read" });
      } catch (error) {
          console.error("❌ Error marking admin messages as read:", error);
          res.status(500).json({ error: error.message });
      }
  }    
    
};

module.exports = MessageController;
