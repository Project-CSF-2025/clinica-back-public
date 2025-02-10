const ReportStatusHistoryModel = require('../models/reportStatusHistoryModel');

const ReportStatusHistoryService = {
    async addStatusChange(statusChangeData) {
        return await ReportStatusHistoryModel.addStatusChange(statusChangeData);
    },

    async getStatusHistoryByReportId(reportId) {
        const statusHistory = await ReportStatusHistoryModel.getStatusHistoryByReportId(reportId);
        if (!statusHistory.length) {
            throw new Error('No status history found for this report');
        }
        return statusHistory;
    }
};

module.exports = ReportStatusHistoryService;
