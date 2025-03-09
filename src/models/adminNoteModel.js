const db = require('../config/database'); // ✅ Ensure correct database import

const AdminNoteModel = {
    async createNote(noteData) {
        try {
            const query = `
                INSERT INTO admin_notes (id_report, admin_message, created_at, last_update_at) 
                VALUES (?, ?, NOW(), NOW())`;

            const values = [noteData.id_report, noteData.admin_message];

            
            const [result] = await db.promise().query(query, values);

            console.log("✅ Insert result:", result);

            const [newNote] = await db.promise().query(`SELECT * FROM Admin_Notes WHERE id_note = ?`, [result.insertId]);

            return newNote[0];
        } catch (error) {
            console.error("❌ Database error in createNote:", error);
            throw new Error("Database error while creating admin note.");
        }
    },

    async getAdminNoteByReportId(id_report) {
        try {
            const query = "SELECT * FROM admin_notes WHERE id_report = ?";
            const [rows] = await db.promise().query(query, [id_report]);
    
            return rows.length > 0 ? rows[0] : null; // ✅ Ensure returning correct object
        } catch (error) {
            console.error("❌ Error in getAdminNoteByReportId:", error);
            throw new Error("Database error while fetching admin note.");
        }
    },       

    async updateNote(noteId, updateData) {
        try {
            const query = `
                UPDATE admin_notes 
                SET admin_message = ?, last_update_at = NOW()
                WHERE id_note = ?`;
    
            const values = [updateData.admin_message, noteId];
    
            const [result] = await db.promise().query(query, values);
    
            if (result.affectedRows === 0) {
                return null; 
            }
    
            const [updatedNote] = await db.promise().query(
                `SELECT * FROM admin_notes WHERE id_note = ?`,
                [noteId]
            );
    
            return updatedNote[0];
        } catch (error) {
            console.error("❌ Database error in updateNote:", error);
            throw new Error("Database error while updating memo.");
        }
    },    

    async deleteNote(noteId) {
        try {
            // ✅ Fetch the note before deleting
            const [deletedNote] = await db.promise().query(`SELECT * FROM Admin_Notes WHERE id_note = ?`, [noteId]);

            // ✅ Proceed with deletion
            await db.promise().query(`DELETE FROM Admin_Notes WHERE id_note = ?`, [noteId]);

            return deletedNote.length ? deletedNote[0] : null;
        } catch (error) {
            console.error("❌ Database error in deleteNote:", error);
            throw new Error("Database error while deleting note.");
        }
    }
};

module.exports = AdminNoteModel;
