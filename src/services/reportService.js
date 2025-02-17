const ReportModel = require('../models/reportModel');

const ReportService = {
    async createReport(reportData) {
        if (!reportData.report_code) {
            reportData.report_code = `REP${Math.floor(1000 + Math.random() * 9000)}`;
        }
        return await ReportModel.createReport(reportData);
    },

    async getReportByCode(reportCode) {
        const report = await ReportModel.getReportByCode(reportCode);
        if (!report) {
            throw new Error('Report not found');
        }
        return report;
    },

    async getAllReports() {
        return await ReportModel.getAllReports();
    },

    async updateReport(id_report, updateData) {
        return await ReportModel.updateReport(id_report, updateData);
    },

    async deleteReport(id_report) {
        const deletedReport = await ReportModel.deleteReport(id_report);
        if (!deletedReport) {
            throw new Error(`No report found with id_report: ${id_report}`);
        }
        return deletedReport; // Return the deleted report details
    }
};

module.exports = ReportService;
