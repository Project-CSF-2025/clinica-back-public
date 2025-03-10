const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');
const reportStatusHistoryRoutes = require('./routes/reportStatusHistoryRoutes');
const messagesRoutes = require('./routes/messageRoutes');
const adminNotesRoutes = require('./routes/adminNoteRoutes');
const attachmentsRoutes = require('./routes/attachmentRoutes');

const app = express(); // ✅ Initialize app before using middleware

// ✅ Add the logging middleware here
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
});

app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);
app.use("/api/status-history", reportStatusHistoryRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/admin-notes', adminNotesRoutes);
app.use('/api/attachments', attachmentsRoutes);

module.exports = app;
