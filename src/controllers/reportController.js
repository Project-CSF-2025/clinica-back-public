const ReportModel = require('../models/reportModel');

// Create a new report
exports.createReport = (req, res) => {
    const { id_user, department, location, subject, description, status } = req.body;

    // Validate required fields
    if (!id_user || !department || !location || !subject || !description) {
        return res.status(400).json({ message: 'Missing required fields to create a report' });
    }

    // Call the model to create the report
    ReportModel.createReport({ id_user, department, location, subject, description, status }, (err, result) => {
        if (err) {
            console.error('Error creating report:', err);
            return res.status(500).json({ message: 'Failed to create report' });
        }

        res.status(201).json({ message: 'Report created successfully', reportId: result.insertId, reportCode: result.report_code });
    });
};

// Get a report by its code
exports.getReportByCode = (req, res) => {
    const { reportCode } = req.params;

    ReportModel.getReportByCode(reportCode, (err, report) => {
        if (err) {
            console.error('Error fetching report:', err);
            return res.status(500).json({ message: 'Failed to fetch report' });
        }

        if (!report || report.length === 0) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.status(200).json(report[0]);
    });
};
