const db = require('../config/database');

const ReportStatusHistoryModel = {
  async addStatusChange(statusChangeData) {
    const query = `INSERT INTO report_status_history (id_report, old_status, new_status) VALUES (?, ?, ?)`;
    const { id_report, old_status, new_status } = statusChangeData;

    const result = await new Promise((resolve, reject) => {
      db.query(query, [id_report, old_status, new_status], (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });

    return result;
  },

  async getStatusHistoryByReportId(id_report) {
    const query = `SELECT * FROM report_status_history WHERE id_report = ? ORDER BY changed_at DESC`;

    const results = await new Promise((resolve, reject) => {
      db.query(query, [id_report], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });

    return results;
  }
};

module.exports = ReportStatusHistoryModel;
