const db = require('../config/database');

const ReportStatusHistoryModel = {
    async addStatusChange(statusChangeData) {
        const query = `INSERT INTO report_status_history (id_report, old_status, new_status) VALUES (?, ?, ?)`;
        const { id_report, old_status, new_status } = statusChangeData;

        const [result] = await db.promise().query(query, [id_report, old_status, new_status]);
        return result;
    },

    async getStatusHistoryByReportId(reportId) {
        const query = `SELECT * FROM report_status_history WHERE id_report = ? ORDER BY changed_at DESC`;

        const [results] = await db.promise().query(query, [reportId]);
        return results;
    }
};

module.exports = ReportStatusHistoryModel;
