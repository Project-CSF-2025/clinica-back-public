const ReportModel = require('../models/reportModel');

const ReportService = {
    async createReport(reportData) {
        if (!reportData.report_code) {
            reportData.report_code = generateReportCode();
        }
        return await ReportModel.createReport(reportData);
    },

    async getReportByCode(report_Code) {
        return await ReportModel.getReportByCode(report_Code);
    },       

    async getAllReports() {
        return await ReportModel.getAllReports();
    },

    async deleteReport(id_report) {
        const deletedReport = await ReportModel.deleteReport(id_report);
        if (!deletedReport) {
            throw new Error(`No report found with id_report: ${id_report}`);
        }
        return deletedReport;
    },

    async toggleFlag(id_report, is_flagged) {
        return await ReportModel.toggleFlag(id_report, is_flagged);
    },

    async toggleFlag(id_report, is_flagged) {
        return await ReportModel.toggleFlag(id_report, is_flagged);
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
