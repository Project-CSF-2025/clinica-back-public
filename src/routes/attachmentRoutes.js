const express = require('express');
const AttachmentController = require('../controllers/attachmentController');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// ✅ DOWNLOAD ROUTE — must go first
router.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  console.log("🟡 Requested filename:", filename);

  if (!filename) {
    return res.status(400).json({ error: 'Falta el nombre del archivo' });
  }

  const ext = path.extname(filename).toLowerCase();
  const folder = ['.jpg', '.jpeg', '.png', '.gif', '.svg'].includes(ext) ? 'images' : 'documents';
  const filePath = path.join(__dirname, `../../public/uploads/${folder}/${filename}`);
  console.log("📁 Looking for file at:", filePath);

  if (!fs.existsSync(filePath)) {
    console.warn("❌ File not found at path:", filePath);
    return res.status(404).json({ error: 'Archivo no encontrado' });
  }

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error("❌ Error during download:", err);
      if (!res.headersSent) {
        res.status(500).send("Fallo al descargar el archivo");
      }
    }
  });
});

// ✅ Other CRUD routes
router.get('/:reportId', AttachmentController.getAttachmentsByReportId);
router.post('/', AttachmentController.createAttachment);
router.put('/:id', AttachmentController.updateAttachment);
router.delete('/:id', AttachmentController.deleteAttachment);

module.exports = router;
