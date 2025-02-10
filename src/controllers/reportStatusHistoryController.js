const ReportStatusHistoryService = require('../services/reportStatusHistoryService');

const ReportStatusHistoryController = {
    async addStatusChange(req, res) {
        try {
            const statusChangeData = req.body;
            const newStatusChange = await ReportStatusHistoryService.addStatusChange(statusChangeData);
            res.status(201).json(newStatusChange);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getStatusHistoryByReportId(req, res) {
        try {
            const { reportId } = req.params;
            const statusHistory = await ReportStatusHistoryService.getStatusHistoryByReportId(reportId);
            res.json(statusHistory);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
};

module.exports = ReportStatusHistoryController;
