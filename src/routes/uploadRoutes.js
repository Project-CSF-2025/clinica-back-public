const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { sql, pool } = require('../config/database'); // ✅ Required to save to DB

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.svg'].includes(ext);
    const uploadDir = isImage ? 'images' : 'documents';
    const fullPath = path.join(__dirname, `../../public/uploads/${uploadDir}`);

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }

    cb(null, fullPath);
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname.replace(/\s+/g, '')}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.svg'].includes(ext);
    const uploadDir = isImage ? 'images' : 'documents';

    const file_path = `/uploads/${uploadDir}/${req.file.filename}`;
    const attachment_type = isImage ? 'IMAGE' : 'DOCUMENT';

    // You can store report_id later when the full report is submitted
    // Or temporarily return it to frontend to associate later
    // For now, return file metadata
    res.json({
      filename: req.file.filename,
      file_path,
      type: req.file.mimetype,
      attachment_type,
      original_name: req.file.originalname
    });

  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ error: "Upload failed", details: error.message });
  }
});

module.exports = router;
