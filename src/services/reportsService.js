const ReportModel = require('../models/reportModel');

const ReportService = {
    async createReport(reportData) {
        // Business logic: generate unique report code (if not generated elsewhere)
        if (!reportData.report_code) {
            reportData.report_code = `REP${Math.floor(1000 + Math.random() * 9000)}`;
        }

        // Call the model to insert the report
        return await ReportModel.createReport(reportData);
    },

    async getReportByCode(reportCode) {
        const report = await ReportModel.getReportByCode(reportCode);
        if (!report) {
            throw new Error('Report not found');
        }
        return report;
    },

    async updateReport(reportId, updateData) {
        return await ReportModel.updateReport(reportId, updateData);
    },

    async deleteReport(reportId) {
        return await ReportModel.deleteReport(reportId);
    }
};

module.exports = ReportService;
