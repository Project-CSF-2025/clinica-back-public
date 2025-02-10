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

    async updateReport(reportId, updateData) {
        const query = `UPDATE reports SET subject = ?, description = ?, status = ? WHERE id = ?`;
        const { subject, description, status } = updateData;

        const [result] = await db.promise().query(query, [subject, description, status, reportId]);
        return result;
    },

    async deleteReport(reportId) {
        const query = `DELETE FROM reports WHERE id = ?`;

        const [result] = await db.promise().query(query, [reportId]);
        return result;
    }
};

module.exports = ReportModel;
