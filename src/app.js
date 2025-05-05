const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// ✅ Middleware for logging all incoming requests
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
});

app.use(cors());
// Increase JSON payload limit to 10MB (or more, if needed)
app.use(express.json({ limit: '10mb' }));

// ✅ Import all route modules
const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');
const reportStatusHistoryRoutes = require('./routes/reportStatusHistoryRoutes');
const messagesRoutes = require('./routes/messageRoutes');
const adminNotesRoutes = require('./routes/adminNoteRoutes');
const attachmentsRoutes = require('./routes/attachmentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const uploadRoutes = require('./routes/uploadRoutes'); // New dedicated upload route

// ✅ Mount all API routes
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/status-history', reportStatusHistoryRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/admin-notes', adminNotesRoutes);
app.use('/api/attachments', attachmentsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', uploadRoutes); 

app.use((req, res, next) => {
    if (req.url.startsWith('/uploads')) {
      console.log('🟢 Static request received:', req.url);
    }
    next();
  });
  
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

module.exports = app;
