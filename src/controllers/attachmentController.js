const AttachmentService = require('../services/attachmentService');
const CreateAttachmentDTO = require('../dtos/createAttachment.dto.js');

const AttachmentController = {
    async createAttachment(req, res) {
        try {
          console.log("📥 Incoming file:", req.file);              // ← log uploaded file
          console.log("📥 Incoming body:", req.body);              // ← log other fields
      
          if (!req.file) {
            return res.status(400).json({ error: 'File is required' });
          }
      
          const data = {
            id_report: parseInt(req.body.id_report, 10),
            attachment_type: req.body.attachment_type,
            file_path: req.file.filename
          };
      
          console.log("✅ Data to save:", data);                  // ← confirm before DB
      
          const validated = new CreateAttachmentDTO(data);
          const newAttachment = await AttachmentService.createAttachment(validated);
      
          console.log("💾 Saved in DB:", newAttachment);          // ← DB confirmation
      
          res.status(201).json(newAttachment);
        } catch (error) {
          console.error("❌ Error in createAttachment:", error.message); // ← log any errors
          res.status(400).json({ error: error.message });
        }
      },
            
    async getAttachmentsByReportId(req, res) {
        try {
        const { reportId } = req.params;
        const attachments = await AttachmentService.getAttachmentsByReportId(reportId);

        if (!attachments.length) {
            return res.status(404).json({ error: 'No attachments found for this report' });
        }

        res.json(attachments);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }
};

module.exports = AttachmentController;
