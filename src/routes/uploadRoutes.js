const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.svg'].includes(ext);
    const uploadDir = isImage ? 'images' : 'documents';
    const fullPath = path.join(__dirname, `../public/uploads/${uploadDir}`);

    // ✅ Ensure folder exists before saving file
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log("✅ Created missing folder:", fullPath);
    }

    cb(null, fullPath);
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname.replace(/\s+/g, '')}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.svg'].includes(ext);
    const uploadDir = isImage ? 'images' : 'documents';

    res.json({
      filename: req.file.filename,
      file_path: `/uploads/${uploadDir}/${req.file.filename}`,
      type: req.file.mimetype,
      attachment_type: isImage ? 'IMAGE' : 'DOCUMENT'
    });

  } catch (error) {
    console.error("❌ Upload route error:", error);
    res.status(500).json({ error: "File upload failed", details: error.message });
  }
});

module.exports = router;
