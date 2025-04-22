const db = require('../config/database');

const AdminNoteModel = {
    async createNote(noteData) {
        try {
            const query = `
                INSERT INTO admin_notes (id_report, admin_message, created_at, last_update_at) 
                VALUES (?, ?, NOW(), NOW())`;

            const values = [noteData.id_report, noteData.admin_message];

            const insertResult = await new Promise((resolve, reject) => {
                db.query(query, values, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            console.log("✅ Insert result:", insertResult);

            const newNote = await new Promise((resolve, reject) => {
                db.query(`SELECT * FROM admin_notes WHERE id_note = ?`, [insertResult.insertId], (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows);
                });
            });

            return newNote[0];
        } catch (error) {
            console.error("❌ Database error in createNote:", error);
            throw new Error("Database error while creating admin note.");
        }
    },

    async getAllAdminNotes() {
        try {
            const query = "SELECT * FROM admin_notes WHERE is_deleted = FALSE"; // Exclude soft-deleted notes
            const rows = await new Promise((resolve, reject) => {
                db.query(query, (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });
            return rows;
        } catch (error) {
            console.error("❌ Database error in getAllAdminNotes:", error);
            throw new Error("Database error while fetching all admin notes.");
        }
    },

    async getAdminNoteByReportId(id_report) {
        try {
            const query = "SELECT * FROM admin_notes WHERE id_report = ?";
            const rows = await new Promise((resolve, reject) => {
                db.query(query, [id_report], (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });

            return rows.length > 0 ? rows[0] : null; 
        } catch (error) {
            console.error("❌ Error in getAdminNoteByReportId:", error);
            throw new Error("Database error while fetching admin note.");
        }
    },

    async updateNote(noteId, updateData) {
        try {
            const query = `
                UPDATE admin_notes 
                SET admin_message = ?, last_update_at = NOW(), is_deleted = FALSE
                WHERE id_note = ?`;

            const values = [updateData.admin_message, noteId];

            const result = await new Promise((resolve, reject) => {
                db.query(query, values, (err, res) => {
                    if (err) return reject(err);
                    resolve(res);
                });
            });

            if (result.affectedRows === 0) {
                return null; 
            }

            const updatedNote = await new Promise((resolve, reject) => {
                db.query(`SELECT * FROM admin_notes WHERE id_note = ?`, [noteId], (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows);
                });
            });

            return updatedNote[0];
        } catch (error) {
            console.error("❌ Database error in updateNote:", error);
            throw new Error("Database error while updating memo.");
        }
    },

    async deleteNote(noteId) {
        try {
            const query = `UPDATE admin_notes SET is_deleted = TRUE WHERE id_note = ?`;
            const result = await new Promise((resolve, reject) => {
                db.query(query, [noteId], (err, res) => {
                    if (err) return reject(err);
                    resolve(res);
                });
            });

            if (result.affectedRows === 0) return null;

            const updatedNote = await new Promise((resolve, reject) => {
                db.query(`SELECT * FROM admin_notes WHERE id_note = ?`, [noteId], (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows);
                });
            });

            return updatedNote[0];
        } catch (error) {
            console.error("❌ Database error in softDeleteNote:", error);
            throw new Error("Database error while soft deleting note.");
        }
    }
};

module.exports = AdminNoteModel;
