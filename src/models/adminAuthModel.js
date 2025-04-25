const { sql, pool } = require('../config/database');

const AdminAuthModel = {
  async findByEmail(email) {
    const query = `SELECT * FROM admins WHERE email = @Email`;
    const request = pool.request();
    request.input('Email', sql.VarChar, email);

    const result = await request.query(query);
    return result.recordset[0] || null;
  },

  async findByResetToken(token) {
    console.log("🪪 Checking token:", token);
  
    const query = `
      SELECT * FROM admins
      WHERE reset_token = @Token
    `;
    const request = pool.request();
    request.input('Token', sql.VarChar, token);
  
    const result = await request.query(query);
    const admin = result.recordset[0];
  
    if (!admin) {
      console.warn("⚠️ Token not found.");
      return null;
    }
  
    const now = new Date();
    const expiry = new Date(admin.reset_token_expiry);
  
    console.log("✅ Admin found:", admin.email);
    console.log("⏳ DB expiry:", expiry);
    console.log("🕒 JS current time:", now);
  
    // ✅ Check and clear if token is expired
    if (now > expiry) {
      console.warn("⛔ Token expired. Cleaning it from DB...");
  
      const clearRequest = pool.request();
      clearRequest.input('AdminId', sql.Int, admin.id_admin);
  
      await clearRequest.query(`
        UPDATE admins 
        SET reset_token = NULL, reset_token_expiry = NULL 
        WHERE id_admin = @AdminId
      `);
  
      return null;
    }
  
    return admin;
  },   

  async saveResetToken(email, token, expiry) {
    const cleanupQuery = `
      UPDATE admins
      SET reset_token = NULL, reset_token_expiry = NULL
      WHERE reset_token_expiry IS NOT NULL AND reset_token_expiry < GETDATE()
    `;
  
    await pool.request().query(cleanupQuery); // 🧹 Clear old/expired tokens
  
    const saveQuery = `
      UPDATE admins
      SET reset_token = @Token, reset_token_expiry = @Expiry
      WHERE email = @Email
    `;
  
    const request = pool.request();
    request.input('Token', sql.VarChar, token);
    request.input('Expiry', sql.DateTimeOffset, expiry); 
    request.input('Email', sql.VarChar, email);

  
    await request.query(saveQuery); // 💾 Save new token
  },  

  async updatePassword(id_admin, hashedPassword) {
    console.log("🛠 Updating password for admin ID:", id_admin);
    console.log("🔐 New hashed password:", hashedPassword);

    const query = `
      UPDATE admins
      SET password_hash = @Password, reset_token = NULL, reset_token_expiry = NULL
      WHERE id_admin = @AdminId
    `;
    const request = pool.request();
    request.input('Password', sql.VarChar, hashedPassword);
    request.input('AdminId', sql.Int, id_admin);

    await request.query(query);
  }
};

module.exports = AdminAuthModel;
