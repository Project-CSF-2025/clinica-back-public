const ReportStatusHistoryModel = require('../models/reportStatusHistoryModel');

// GET: Get report status history for a report by ID
exports.getStatusHistory = (req, res) => {
    const { id_report } = req.params;

    if (!id_report) {
        return res.status(400).json({ message: 'Report ID is required' });
    }

    ReportStatusHistoryModel.getStatusHistoryByReportId(id_report, (err, results) => {
        if (err) {
            console.error('Error fetching status history:', err);
            return res.status(500).json({ message: 'Failed to fetch status history' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No status history found for this report' });
        }

        res.status(200).json(results);
    });
};

// POST: Add a new status history entry
exports.addStatusHistory = (req, res) => {
    const { id_report, old_status, new_status } = req.body;

    if (!id_report || !new_status) {
        return res.status(400).json({ message: 'Report ID and new status are required' });
    }

    const statusChangeData = { id_report, old_status, new_status };

    ReportStatusHistoryModel.addStatusChange(statusChangeData, (err, result) => {
        if (err) {
            console.error('Error adding status history:', err);
            return res.status(500).json({ message: 'Failed to add status history' });
        }

        res.status(201).json({
            message: 'Status history added successfully',
            historyId: result.insertId,
        });
    });
};
