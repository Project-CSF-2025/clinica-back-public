const ReportStatusHistoryModel = require('../models/reportStatusHistoryModel');

const ReportStatusHistoryService = {
    async addStatusChange(statusChangeData) {
        return await ReportStatusHistoryModel.addStatusChange(statusChangeData);
    },

    async getStatusHistoryByReportId(id_report) { 
        return await ReportStatusHistoryModel.getStatusHistoryByReportId(id_report);
    }
};

module.exports = ReportStatusHistoryService;
