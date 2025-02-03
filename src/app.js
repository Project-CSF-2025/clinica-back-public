const express = require('express');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');
const messagesRoutes = require('./routes/messagesRoutes');
const reportStatusHistoryRoutes = require('./routes/reportStatusHistoryRoutes');
const attachmentsRoutes = require('./routes/attachmentsRoutes');
const adminNotesRoutes = require('./routes/adminNotesRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/status-history', reportStatusHistoryRoutes);
app.use('/api/attachments', attachmentsRoutes);
app.use('/api/admin-notes', adminNotesRoutes);

module.exports = app;
