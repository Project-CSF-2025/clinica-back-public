const db = require('../config/database');

const ReportStatusHistoryModel = {
    addStatusChange: (statusChangeData, callback) => {
        const query = `INSERT INTO report_status_history (id_report, old_status, new_status) 
                       VALUES (?, ?, ?)`;

        const { id_report, old_status, new_status } = statusChangeData;

        db.query(query, [id_report, old_status, new_status], callback);
    },

    getStatusHistoryByReportId: (reportId, callback) => {
        const query = `SELECT * FROM report_status_history WHERE id_report = ? ORDER BY changed_at DESC`;
        db.query(query, [reportId], callback);
    }
};

module.exports = ReportStatusHistoryModel;
