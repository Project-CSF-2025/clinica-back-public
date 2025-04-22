const { sql, pool } = require('../config/database');

const ReportModel = {
  async createReport(reportData) {
    const userId = reportData.id_user || 1;

    const query = `
      INSERT INTO reports (
        id_user, report_code, department, profession, location, subject,
        description, is_consequent, avoidable, consequence_type,
        suggestions, status, created_at, updated_at
      )
      OUTPUT INSERTED.id_report
      VALUES (
        @id_user, @report_code, @department, @profession, @location, @subject,
        @description, @is_consequent, @avoidable, @consequence_type,
        @suggestions, @status, GETDATE(), GETDATE()
      )
    `;

    const request = pool.request();
    request.input('id_user', sql.Int, userId);
    request.input('report_code', sql.VarChar, reportData.report_code);
    request.input('department', sql.VarChar, reportData.department);
    request.input('profession', sql.VarChar, reportData.profession);
    request.input('location', sql.VarChar, reportData.location);
    request.input('subject', sql.VarChar, reportData.subject);
    request.input('description', sql.Text, reportData.description);
    request.input('is_consequent', sql.VarChar, reportData.isConsequent);
    request.input('avoidable', sql.VarChar, reportData.avoidable);
    request.input('consequence_type', sql.Text, reportData.consequenceType);
    request.input('suggestions', sql.Text, reportData.suggestions);
    request.input('status', sql.VarChar, reportData.status || 'No leído');

    const result = await request.query(query);
    return { insertId: result.recordset[0].id_report, report_code: reportData.report_code };
  },

  async getAllReports() {
    const query = `
      SELECT 
        r.*,
        (
          SELECT COUNT(*) 
          FROM messages 
          WHERE messages.id_report = r.id_report AND sender_type = 'user' AND is_read = 0
        ) AS unread_messages,
        (
          SELECT MAX(created_at)
          FROM messages
          WHERE messages.id_report = r.id_report
        ) AS last_activity_at
      FROM reports r
    `;

    const result = await pool.request().query(query);
    return result.recordset.map(report => ({
      ...report,
      unread_messages: report.unread_messages || 0,
      last_activity_at: report.last_activity_at || report.updated_at || report.created_at
    }));
  },

  async getReportByCode(report_code) {
    if (!report_code) {
      throw new Error("❌ Report code is required");
    }

    const query = `SELECT * FROM reports WHERE report_code = @report_code`;
    const result = await pool.request()
      .input('report_code', sql.VarChar, report_code)
      .query(query);

    if (!result.recordset.length) return null;

    return result.recordset[0];
  },

  async getReportById(id_report) {
    const query = `SELECT * FROM reports WHERE id_report = @id_report`;
    const result = await pool.request()
      .input('id_report', sql.Int, id_report)
      .query(query);

    return result.recordset[0] || null;
  },

  async updateReport(id_report, updateData) {
    const query = `
      UPDATE reports 
      SET 
        subject = @subject,
        description = @description,
        status = @status,
        profession = @profession,
        is_consequent = @is_consequent,
        avoidable = @avoidable,
        consequence_type = @consequence_type,
        suggestions = @suggestions,
        updated_at = GETDATE()
      WHERE id_report = @id_report
    `;

    const request = pool.request();
    request.input('subject', sql.VarChar, updateData.subject);
    request.input('description', sql.Text, updateData.description);
    request.input('status', sql.VarChar, updateData.status);
    request.input('profession', sql.VarChar, updateData.profession);
    request.input('is_consequent', sql.VarChar, updateData.isConsequent);
    request.input('avoidable', sql.VarChar, updateData.avoidable);
    request.input('consequence_type', sql.Text, updateData.consequenceType);
    request.input('suggestions', sql.Text, updateData.suggestions);
    request.input('id_report', sql.Int, id_report);

    await request.query(query);

    return await this.getReportById(id_report);
  },

  async toggleFlag(id_report, is_flagged) {
    const updateQuery = `UPDATE reports SET is_flagged = @is_flagged WHERE id_report = @id_report`;
    const request = pool.request();
    request.input('is_flagged', sql.Bit, is_flagged);
    request.input('id_report', sql.Int, id_report);

    await request.query(updateQuery);

    return await this.getReportById(id_report);
  },

  async updateReportStatus(report_code, newStatus) {
    const query = `
      UPDATE reports
      SET status = @status, updated_at = GETDATE()
      WHERE report_code = @report_code
    `;

    const result = await pool.request()
      .input('status', sql.VarChar, newStatus)
      .input('report_code', sql.VarChar, report_code)
      .query(query);

    return result.rowsAffected[0] > 0;
  }
};

module.exports = ReportModel;
