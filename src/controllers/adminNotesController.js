const AdminNotesModel = require('../models/adminNotesModel');

exports.createNote = (req, res) => {
    const { id_report, admin_message } = req.body;

    if (!id_report || !admin_message) {
        return res.status(400).json({ message: 'Required fields are missing' });
    }

    AdminNotesModel.createNote({ id_report, admin_message }, (err, result) => {
        if (err) {
            console.error('Error creating note:', err);
            return res.status(500).json({ message: 'Failed to create note' });
        }

        res.status(201).json({ message: 'Note added successfully', noteId: result.insertId });
    });
};

exports.getNotesByReport = (req, res) => {
    const reportId = req.params.reportId;

    AdminNotesModel.getNotesByReportId(reportId, (err, results) => {
        if (err) {
            console.error('Error fetching notes:', err);
            return res.status(500).json({ message: 'Failed to fetch notes' });
        }

        res.status(200).json(results);
    });
};
