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

    async getReportByCode(req, res) {
        try {
          const { report_code } = req.params;
          const report = await ReportService.getReportByCode(report_code);
      
          if (!report) {
            // If the model returned null, send a 404 or an empty array
            return res.status(404).json({ message: "Report not found" });
          }
      
          // Otherwise, send the report data
          return res.status(200).json(report);
        } catch (error) {
          console.error("Error fetching report:", error);
          return res.status(500).json({ error: error.message });
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
    },

    async toggleFlag(req, res) {
        try {
            const { id_report } = req.params;
            const { is_flagged } = req.body;

            if (is_flagged === undefined) {
                return res.status(400).json({ error: "is_flagged value is required." });
            }

            const updatedReport = await ReportService.toggleFlag(id_report, is_flagged);
            res.json(updatedReport);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },
    async updateReportStatus(req, res) {
        try {
            const { report_code } = req.params;
            const { status: newStatus } = req.body;

            if (!newStatus) {
                return res.status(400).json({ error: "New status is required" });
            }

            const updatedReport = await ReportService.updateReportStatus(report_code, newStatus);

            if (!updatedReport) {
                return res.status(404).json({ error: "Report not found" });
            }

            res.json({ message: "Status updated successfully", report: updatedReport });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = ReportController;
