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
            const query = `SELECT id_report, report_code, department, profession, location, subject, description, is_consequent, avoidable, consequence_type, suggestions, status, created_at, updated_at, is_flagged FROM reports`;
            const [results] = await db.promise().query(query);
            
            return results.map(report => ({
                id_report: report.id_report,
                report_code: report.report_code || null,
                department: report.department || null,
                profession: report.profession || null,
                location: report.location || null,
                subject: report.subject || null,
                description: report.description || null,
                is_consequent: report.is_consequent ?? null,
                avoidable: report.avoidable ?? null,
                consequence_type: report.consequence_type || null,
                suggestions: report.suggestions || null,
                status: report.status || "No leído",
                created_at: report.created_at,
                updated_at: report.updated_at,
                is_flagged: report.is_flagged ?? false, // ✅ Ensure flag is included
            }));
        } catch (error) {
            console.error("❌ Error fetching reports:", error);
            throw error;
        }
    },    

    async getReportByCode(report_code) {
        if (!report_code) {
            throw new Error("❌ Report code is required");
        }
    
        const query = `SELECT * FROM reports WHERE report_code = ?`;
        const [results] = await db.promise().query(query, [report_code]);
    
        if (!results.length) return null;
    
        // ✅ Return `null` for missing values (Frontend will handle them)
        const report = results[0];
    
        return {
            id_report: report.id_report,
            report_code: report.report_code || null,
            department: report.department || null,
            profession: report.profession || null,
            location: report.location || null,
            subject: report.subject || null,
            description: report.description || null,
            is_consequent: report.is_consequent ?? null,
            avoidable: report.avoidable ?? null,
            consequence_type: report.consequence_type || null,
            suggestions: report.suggestions || null,
            status: report.status || "No leído",
            created_at: report.created_at,
            updated_at: report.updated_at,
            is_flagged: report.is_flagged ?? false, // ✅ Ensure flag is included
        };
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
    },

    async toggleFlag(id_report, is_flagged) {
        try {
            const query = `UPDATE reports SET is_flagged = ? WHERE id_report = ?`;
            await db.promise().query(query, [is_flagged, id_report]);

            const [updatedReport] = await db.promise().query(
                `SELECT * FROM reports WHERE id_report = ?`, 
                [id_report]
            );

            return updatedReport[0];
        } catch (error) {
            console.error("❌ Error toggling flag:", error);
            throw error;
        }
    }
};

module.exports = ReportModel;
