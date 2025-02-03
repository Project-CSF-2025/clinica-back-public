const db = require('../config/database');

// Get report status history for a report by ID
exports.getStatusHistory = (req, res) => {
    const { id_report } = req.params;

    const query = `SELECT * FROM report_status_history WHERE id_report = ? ORDER BY changed_at DESC`;
    db.query(query, [id_report], (err, results) => {
        if (err) {
            console.error('Error fetching status history:', err);
            return res.status(500).json({ message: 'Failed to fetch status history' });
        }

        res.status(200).json(results);
    });
};

// Add a new status history entry
exports.addStatusHistory = (req, res) => {
    const { id_report, old_status, new_status } = req.body;

    if (!id_report || !new_status) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const query = `INSERT INTO report_status_history (id_report, old_status, new_status) VALUES (?, ?, ?)`;
    db.query(query, [id_report, old_status, new_status], (err, result) => {
        if (err) {
            console.error('Error adding status history:', err);
            return res.status(500).json({ message: 'Failed to add status history' });
        }

        res.status(201).json({ message: 'Status history added successfully', historyId: result.insertId });
    });
};
