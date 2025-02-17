const ReportService = require('../services/reportService');

const ReportController = {
    async getAllReports(req, res) {
        try {
            const reports = await ReportService.getAllReports();
            res.json(reports);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getReportByCode(req, res) {
        try {
            const report = await ReportService.getReportByCode(req.params.reportCode);
            if (!report) return res.status(404).json({ error: 'Report not found' });
            res.json(report);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async createReport(req, res) {
        try {
            const newReport = await ReportService.createReport(req.body);
            res.status(201).json(newReport);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async updateReport(req, res) {
        try {
            const { id_report } = req.params;
            const updatedReport = await ReportService.updateReport(id_report, req.body);

            if (!updatedReport) {
                return res.status(404).json({ error: "Report not found" });
            }

            res.json(updatedReport); // Return only the important fields
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteReport(req, res) {
        try {
            const { id_report } = req.params;
            await ReportService.deleteReport(id_report);

            res.json({ message: "Report deleted successfully" }); // Simple success message
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
};

module.exports = ReportController;
