const db = require('../config/database'); // ✅ Ensure correct database import

const AdminNoteModel = {
    async createNote(noteData) {
        try {
            const query = `
                INSERT INTO Admin_Notes (id_report, admin_message, created_at, last_update_at) 
                VALUES (?, ?, NOW(), NOW())`;

            const values = [noteData.id_report, noteData.admin_message];

            // ✅ Use db.promise().query() like in ReportModel.js
            const [result] = await db.promise().query(query, values);

            console.log("✅ Insert result:", result);

            // ✅ Fetch and return the newly inserted row
            const [newNote] = await db.promise().query(`SELECT * FROM Admin_Notes WHERE id_note = ?`, [result.insertId]);

            return newNote[0];
        } catch (error) {
            console.error("❌ Database error in createNote:", error);
            throw new Error("Database error while creating admin note.");
        }
    },

    async getNotesByReportId(reportId) {
        try {
            const query = `SELECT * FROM Admin_Notes WHERE id_report = ?`;
            const [rows] = await db.promise().query(query, [reportId]);

            return rows;
        } catch (error) {
            console.error("❌ Database error in getNotesByReportId:", error);
            throw new Error("Database error while fetching notes.");
        }
    },

    async updateNote(noteId, updateData) {
        try {
            const query = `
                UPDATE Admin_Notes 
                SET admin_message = ?, last_update_at = NOW()
                WHERE id_note = ?`;

            const values = [updateData.admin_message, noteId];

            await db.promise().query(query, values);

            // ✅ Fetch and return the updated row
            const [updatedNote] = await db.promise().query(`SELECT * FROM Admin_Notes WHERE id_note = ?`, [noteId]);

            return updatedNote[0];
        } catch (error) {
            console.error("❌ Database error in updateNote:", error);
            throw new Error("Database error while updating note.");
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
