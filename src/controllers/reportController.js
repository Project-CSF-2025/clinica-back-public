const ReportService = require('../services/reportService');
const ReportModel = require("../models/reportModel"); 

const ReportController = {
    async getAllReports(req, res) {
        try {
            const reports = await ReportService.getAllReports();
            res.json(reports);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getReportByCode(req, res) {  // ✅ FIXED
        try {
            const { report_code } = req.params;  // ✅ Extract report_code from URL
            const report = await ReportModel.getReportByCode(report_code);

            if (!report) {
                return res.status(404).json({ error: "Report not found" });
            }

            res.json(report);
        } catch (error) {
            console.error("❌ Error fetching report:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    async createReport(req, res) {
        try {
            // ✅ Extract uploaded files
            const files = req.files || [];
            const filePaths = files.map(file => file.path); // Save file paths

            // ✅ Add file paths to request body
            const reportData = {
                ...req.body,
                attachments: filePaths, // Store file paths in DB
            };

            // ✅ Call service with updated report data
            const newReport = await ReportService.createReport(reportData);
            res.status(201).json(newReport);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async updateReport(req, res) {
        try {
            const { id_report } = req.params;
            const updatedReport = await ReportService.updateReport(id_report, req.body);

            if (!updatedReport) {
                return res.status(404).json({ error: "Report not found" });
            }

            res.json(updatedReport);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteReport(req, res) {
        try {
            const { id_report } = req.params;
            await ReportService.deleteReport(id_report);

            res.json({ message: "Report deleted successfully" });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
};

module.exports = ReportController;
