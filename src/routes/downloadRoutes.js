const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;

  const imagePath = path.join(__dirname, `../../public/uploads/images/${filename}`);
  const docPath = path.join(__dirname, `../../public/uploads/documents/${filename}`);

  if (fs.existsSync(imagePath)) {
    return res.sendFile(imagePath);
  } else if (fs.existsSync(docPath)) {
    return res.sendFile(docPath);
  } else {
    return res.status(404).json({ error: 'File not found' });
  }
});

module.exports = router;
