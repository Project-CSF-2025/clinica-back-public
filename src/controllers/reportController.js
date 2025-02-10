const ReportService = require('../services/reportService');

const ReportController = {
    async createReport(req, res) {
        try {
            const reportData = req.body;

            // Call the service to create a report
            const newReport = await ReportService.createReport(reportData);
            res.status(201).json(newReport);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getReportByCode(req, res) {
        try {
            const { reportCode } = req.params;

            const report = await ReportService.getReportByCode(reportCode);
            res.json(report);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    async updateReport(req, res) {
        try {
            const reportId = req.params.id;
            const updateData = req.body;

            const updatedReport = await ReportService.updateReport(reportId, updateData);
            res.json(updatedReport);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteReport(req, res) {
        try {
            const reportId = req.params.id;

            await ReportService.deleteReport(reportId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = ReportController;
