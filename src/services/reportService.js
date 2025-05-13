const ReportModel = require('../models/reportModel');
const ReportStatusHistoryModel = require("../models/reportStatusHistoryModel");
const AttachmentModel = require('../models/attachmentModel'); // Assuming this exists
const crypto = require("crypto");
const { poolPromise, sql } = require("../config/database"); // ✅ Correct import for mssql

const ReportService = {
    async createReport(reportData) {
        if (!reportData.report_code) {
            reportData.report_code = await generateUniqueReportCode();
        }        

        const { files, ...reportFields } = reportData;

        const { insertId: id_report, report_code } = await ReportModel.createReport(reportFields);

        console.log("✅ Report created with id_report:", id_report);

        if (id_report && files && Array.isArray(files) && files.length > 0) {
            const attachmentPromises = files.map(file => {
                if (!file.file_path) {
                    console.warn("⚠️ Skipping file due to missing file_path:", file);
                    return null;
                }

                const attachmentData = {
                    id_report,
                    attachment_type: file.attachment_type || 'DOCUMENT',
                    file_path: file.file_path,
                    original_name: file.original_name || file.name || 'unknown',
                    uploaded_at: new Date()
                };                  

                console.log("📎 Saving attachment to DB:", attachmentData);

                return AttachmentModel.createAttachment(attachmentData).catch(err => {
                    console.error(`❌ Failed to insert attachment '${file.name}':`, err.message);
                    return null;
                });
            });

            await Promise.all(attachmentPromises);
        } else {
            console.log("⚠️ No valid files to attach.");
        }

        return {
            id_report,
            report_code
        };
    },          

    async getReportByCode(report_code) {
        return await ReportModel.getReportByCode(report_code);
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

    async updateReportStatus(report_code, newStatus) {
        const report = await ReportModel.getReportByCode(report_code);
        if (!report) throw new Error("Report not found");

        const { id_report, status: oldStatus } = report;

        await ReportModel.updateReportStatus(report_code, newStatus);

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

async function generateUniqueReportCode(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const generateCode = () =>
        Array.from({ length }, () =>
            chars.charAt(Math.floor(Math.random() * chars.length))
        ).join("");

    let code;
    let isUnique = false;

    while (!isUnique) {
        code = generateCode();

        try {
            const pool = await poolPromise;
            const result = await pool
                .request()
                .input("code", sql.VarChar(10), code)
                .query("SELECT report_code FROM Reports WHERE report_code = @code");

            isUnique = result.recordset.length === 0;
        } catch (err) {
            console.error("❌ SQL Error while checking report_code uniqueness:", err.message);
            throw err;
        }
    }

    return code;
}

module.exports = ReportService;
