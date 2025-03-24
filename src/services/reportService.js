const ReportModel = require('../models/reportModel');
const ReportStatusHistoryModel = require("../models/reportStatusHistoryModel");

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
    },

    async updateReportStatus(report_code, newStatus) {
        // Fetch current report details
        const report = await ReportModel.getReportByCode(report_code);
        if (!report) throw new Error("Report not found");
    
        const { id_report, status: oldStatus } = report;
    
        // Update the report status
        await ReportModel.updateReportStatus(report_code, newStatus);
    
        // Log status change in history table
        await ReportStatusHistoryModel.addStatusChange({
            id_report,
            old_status: oldStatus,
            new_status: newStatus
        });
    
        return { report_code, status: newStatus };
    },
    
    async getReportsForExport() {
        const reports = await ReportModel.getAllReports();
        return reports.map(report => ({
            Código: report.report_code,
            Departamento: report.department,
            Profesión: report.profession,
            Ubicación: report.location,
            Asunto: report.subject,
            Estado: report.status,
            Fecha: new Date(report.created_at).toLocaleString('es-ES')
        }));
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
