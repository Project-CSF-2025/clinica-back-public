const { sql, pool } = require('../config/database');

const AdminNoteModel = {
  async createNote(noteData) {
    try {
      const insertQuery = `
        INSERT INTO admin_notes (id_report, admin_message, created_at, last_update_at) 
        OUTPUT INSERTED.*
        VALUES (@id_report, @admin_message, GETDATE(), GETDATE())`;

      const request = pool.request();
      request.input('id_report', sql.Int, noteData.id_report);
      request.input('admin_message', sql.Text, noteData.admin_message);

      const result = await request.query(insertQuery);
      console.log("✅ Insert result:", result);

      return result.recordset[0];
    } catch (error) {
      console.error("❌ Database error in createNote:", error);
      throw new Error("Database error while creating admin note.");
    }
  },

  async getAllAdminNotes() {
    try {
      const query = "SELECT * FROM admin_notes WHERE is_deleted = 0";
      const result = await pool.request().query(query);
      return result.recordset;
    } catch (error) {
      console.error("❌ Database error in getAllAdminNotes:", error);
      throw new Error("Database error while fetching all admin notes.");
    }
  },

  async getAdminNoteByReportId(id_report) {
    try {
      const query = "SELECT * FROM admin_notes WHERE id_report = @id_report";
      const request = pool.request();
      request.input('id_report', sql.Int, id_report);

      const result = await request.query(query);
      return result.recordset.length > 0 ? result.recordset[0] : null;
    } catch (error) {
      console.error("❌ Error in getAdminNoteByReportId:", error);
      throw new Error("Database error while fetching admin note.");
    }
  },

  async updateNote(noteId, updateData) {
    try {
      const query = `
        UPDATE admin_notes 
        SET admin_message = @admin_message, last_update_at = GETDATE(), is_deleted = 0
        WHERE id_note = @noteId`;

      const request = pool.request();
      request.input('admin_message', sql.Text, updateData.admin_message);
      request.input('noteId', sql.Int, noteId);

      const result = await request.query(query);

      if (result.rowsAffected[0] === 0) return null;

      const fetchResult = await pool.request()
        .input('noteId', sql.Int, noteId)
        .query("SELECT * FROM admin_notes WHERE id_note = @noteId");

      return fetchResult.recordset[0];
    } catch (error) {
      console.error("❌ Database error in updateNote:", error);
      throw new Error("Database error while updating memo.");
    }
  },
  
  async softDeleteNote(noteId) {
    try {
      const query = `
        UPDATE admin_notes 
        SET is_deleted = 1, last_update_at = GETDATE()
        WHERE id_note = @noteId`;
  
      const request = pool.request();
      request.input('noteId', sql.Int, noteId);
  
      await request.query(query);
  
      // Optional: return the updated note
      const fetchResult = await pool.request()
        .input('noteId', sql.Int, noteId)
        .query("SELECT * FROM admin_notes WHERE id_note = @noteId");
  
      return fetchResult.recordset[0];
    } catch (error) {
      console.error("❌ Error in softDeleteNote:", error);
      throw new Error("Database error while soft deleting note.");
    }
  }  

};

module.exports = AdminNoteModel;
