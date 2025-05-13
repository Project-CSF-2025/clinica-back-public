const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { sql, pool } = require('../config/database'); 

const router = express.Router();

// Define allowed image extensions
const allowedImageExts = ['.jpg', '.jpeg', '.png', '.svg'];
const allowedDocExts = ['.pdf'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const isImage = allowedImageExts.includes(ext);
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

// Apply limits and file filter
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;

    const isImage = allowedImageExts.includes(ext);
    const isPdf = allowedDocExts.includes(ext) && mime === 'application/pdf';

    if (!isImage && !isPdf) {
      return cb(new Error('Solo se permiten imágenes o archivos PDF de hasta 10MB'), false);
    }

    cb(null, true);
  }
});

// Upload route
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded or invalid file type' });
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    const isImage = allowedImageExts.includes(ext);
    const uploadDir = isImage ? 'images' : 'documents';

    const file_path = `/uploads/${uploadDir}/${req.file.filename}`;
    const attachment_type = isImage ? 'IMAGE' : 'DOCUMENT';

    res.json({
      filename: req.file.filename,
      file_path,
      type: req.file.mimetype,
      attachment_type,
      original_name: req.file.originalname
    });

  } catch (error) {
    console.error("❌ Upload error:", error.message);
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
