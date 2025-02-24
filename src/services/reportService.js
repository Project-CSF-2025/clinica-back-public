const ReportModel = require('../models/reportModel');

const ReportService = {
    async createReport(reportData) {
        if (!reportData.report_code) {
            reportData.report_code = generateReportCode();
        }
        return await ReportModel.createReport(reportData);
    },

    async getReportByCode(reportCode) {
        const report = await ReportModel.getReportByCode(reportCode);
        if (!report) {
            throw new Error("Report not found");
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
        return deletedReport;
    }
};

function generateReportCode() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetters = Array(3) 
        .fill("")
        .map(() => letters[Math.floor(Math.random() * letters.length)])
        .join("");

    const randomNumbers = Math.floor(1000 + Math.random() * 9000); 

    return `${randomLetters}${randomNumbers}`; 
}

module.exports = ReportService;
