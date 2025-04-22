const { sql, pool } = require('../config/database');

const ReportStatusHistoryModel = {
  async addStatusChange(statusChangeData) {
    const query = `
      INSERT INTO report_status_history (id_report, old_status, new_status, changed_at)
      OUTPUT INSERTED.*
      VALUES (@id_report, @old_status, @new_status, GETDATE())`;

    const request = pool.request();
    request.input('id_report', sql.Int, statusChangeData.id_report);
    request.input('old_status', sql.VarChar, statusChangeData.old_status);
    request.input('new_status', sql.VarChar, statusChangeData.new_status);

    const result = await request.query(query);
    return result.recordset[0]; // return full row (optional: just `id_history`)
  },

  async getStatusHistoryByReportId(id_report) {
    const query = `
      SELECT * 
      FROM report_status_history 
      WHERE id_report = @id_report 
      ORDER BY changed_at DESC`;

    const request = pool.request();
    request.input('id_report', sql.Int, id_report);

    const result = await request.query(query);
    return result.recordset;
  }
};

module.exports = ReportStatusHistoryModel;
