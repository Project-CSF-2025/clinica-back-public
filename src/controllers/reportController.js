const ReportService = require('../services/reportService');
const { Parser } = require('json2csv');

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
            return res.status(404).json({ message: "Report not found" });
          }
          return res.status(200).json(report);
        } catch (error) {
          console.error("Error fetching report:", error);
          return res.status(500).json({ error: error.message });
        }
      },      

    async createReport(req, res) {
        try {
            const files = req.files || [];
            const filePaths = files.map(file => file.path); 

            // Add file paths to request body
            const reportData = {
                ...req.body,
                attachments: filePaths, // Store file paths in DB
            };

            // Call service with updated report data
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
    },

    async exportCSV(req, res) {
        try {
            const data = await ReportService.getReportsForExport();
    
            // Explicit fields for consistent order
            const fields = [
                { label: 'Código', value: 'Código' },
                { label: 'Departamento', value: 'Departamento' },
                { label: 'Profesión', value: 'Profesión' },
                { label: 'Ubicación', value: 'Ubicación' },
                { label: 'Asunto', value: 'Asunto' },
                { label: 'Estado', value: 'Estado' },
                { label: 'Fecha', value: 'Fecha' }
            ];
    
            const json2csvParser = new Parser({ fields, withBOM: true });
            const csv = json2csvParser.parse(data);
    
            // Force UTF-8 encoding with BOM for Excel support
            res.setHeader('Content-Type', 'text/csv; charset=utf-8');
            res.setHeader('Content-Disposition', 'attachment; filename=reportes_clinica.csv');
            res.status(200).send('\uFEFF' + csv);
        } catch (error) {
            console.error("❌ Error exporting CSV:", error);
            res.status(500).json({ error: "No se pudo generar el archivo CSV" });
        }
    }
};

module.exports = ReportController;
