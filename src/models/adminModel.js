const { sql, pool } = require('../config/database');

const AdminModel = {
  async getAdminByEmail(email) {
    const query = `SELECT * FROM admins WHERE email = @Email`;
    const request = pool.request();
    request.input('Email', sql.VarChar, email);

    const result = await request.query(query);
    return result.recordset.length ? result.recordset[0] : null;
  }
};

module.exports = AdminModel;
