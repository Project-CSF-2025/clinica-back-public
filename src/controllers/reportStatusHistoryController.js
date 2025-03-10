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
            const { id_report } = req.params;
            console.log(`Fetching status history for report ID: ${id_report}`); // ✅ Debugging Log

            const statusHistory = await ReportStatusHistoryService.getStatusHistoryByReportId(id_report);

            if (!statusHistory.length) {
                return res.status(404).json({ message: "No status history found for this report" });
            }

            res.json(statusHistory);
        } catch (error) {
            console.error("❌ Error fetching status history:", error);
            res.status(500).json({ error: "Server error" });
        }
    }
};

module.exports = ReportStatusHistoryController;
