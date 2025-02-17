const db = require('../config/database');

const ReportModel = {
    async createReport(reportData) {
        const query = `INSERT INTO reports (id_user, report_code, department, location, subject, description, status) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const { id_user, report_code, department, location, subject, description, status } = reportData;

        const [result] = await db.promise().query(query, [id_user, report_code, department, location, subject, description, status || 'No leído']);
        return { insertId: result.insertId, report_code };
    },

    async getReportByCode(reportCode) {
        const query = `SELECT * FROM reports WHERE report_code = ?`;

        const [results] = await db.promise().query(query, [reportCode]);
        return results[0] || null;
    },

    async updateReport(id_report, updateData) {
        const updateQuery = `
            UPDATE reports 
            SET subject = ?, description = ?, status = ?, updated_at = NOW()
            WHERE id_report = ?
        `;

        const { subject, description, status } = updateData;

        await db.promise().query(updateQuery, [subject, description, status, id_report]);

        // Fetch the updated record
        const fetchQuery = `SELECT subject, description, status FROM reports WHERE id_report = ?`;
        const [updatedRows] = await db.promise().query(fetchQuery, [id_report]);

        return updatedRows[0] || null; // Return only the updated fields
    },

    async deleteReport(id_report) {
        // First, retrieve the report details before deletion
        const checkQuery = `SELECT subject, description, status FROM reports WHERE id_report = ?`;
        const [rows] = await db.promise().query(checkQuery, [id_report]);

        if (rows.length === 0) {
            return null; // Report not found
        }

        const deletedReport = rows[0]; // Store the report data before deleting

        // Proceed with deletion
        const deleteQuery = `DELETE FROM reports WHERE id_report = ?`;
        await db.promise().query(deleteQuery, [id_report]);

        return deletedReport; // Return deleted report details instead of MySQL response
    }
};

module.exports = ReportModel;
