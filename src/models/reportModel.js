const db = require('../config/database');

const ReportModel = {
    async createReport(reportData) {

        const userId = reportData.id_user ? reportData.id_user : 1;

        const query = `
            INSERT INTO reports (id_user, report_code, department, profession, location, subject, description, is_consequent, avoidable, consequence_type, suggestions, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            userId,
            reportData.report_code, 
            reportData.department,
            reportData.profession,
            reportData.location,
            reportData.subject,
            reportData.description,
            reportData.isConsequent,
            reportData.avoidable,
            reportData.consequenceType,
            reportData.suggestions,
            reportData.status || 'No leído'
        ];

        const [result] = await db.promise().query(query, values);
        return { insertId: result.insertId, report_code: reportData.report_code };
    },

    async getAllReports() {
        try {
            const query = `SELECT * FROM reports`;
            const [results] = await db.promise().query(query);
            return results;
        } catch (error) {
            console.error("❌ Error fetching reports:", error);
            throw error; // Re-throw to catch in controller
        }
    },

    async getReportByCode(reportCode) {
        const query = `SELECT * FROM reports WHERE report_code = ?`;
        const [results] = await db.promise().query(query, [reportCode]);
        return results[0] || null;
    },

    async updateReport(id_report, updateData) {
        const updateQuery = `
            UPDATE reports 
            SET subject = ?, description = ?, status = ?, profession = ?, is_consequent = ?, avoidable = ?, consequence_type = ?, suggestions = ?, updated_at = NOW()
            WHERE id_report = ?`;

        const values = [
            updateData.subject,
            updateData.description,
            updateData.status,
            updateData.profession,
            updateData.isConsequent,
            updateData.avoidable,
            updateData.consequenceType,
            updateData.suggestions,
            id_report
        ];

        await db.promise().query(updateQuery, values);

        // Fetch the updated record
        const fetchQuery = `SELECT * FROM reports WHERE id_report = ?`;
        const [updatedRows] = await db.promise().query(fetchQuery, [id_report]);

        return updatedRows[0] || null;
    }
};

module.exports = ReportModel;
