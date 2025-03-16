const AdminNoteService = require('../services/adminNoteService');

const AdminNoteController = {

    async getAllAdminNotes(req, res) {
        try {
            const notes = await AdminNoteService.getAllAdminNotes();
            res.json(notes);
        } catch (error) {
            console.error("❌ Error fetching all admin notes:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
        
    async getAdminNoteByReportId(req, res) {
        try {
            const { id_report } = req.params;
            const note = await AdminNoteService.getAdminNoteByReportId(id_report);
            if (!note) return res.status(404).json({ error: "No memo found" });

            res.json(note);
        } catch (error) {
            console.error("Error fetching admin note:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async createNote(req, res) {
        try {
            const newNote = await AdminNoteService.createNote(req.body);
            res.status(201).json(newNote);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },

    async updateNote(req, res) {
        try {
            const { id } = req.params;
            const { admin_message } = req.body;
    
            console.log("📌 Updating memo ID:", id, "New message:", admin_message);
    
            if (!id || !admin_message) {
                return res.status(400).json({ error: "Missing note ID or message" });
            }
    
            const updatedNote = await AdminNoteService.updateNote(id, { admin_message });
    
            if (!updatedNote) {
                return res.status(404).json({ error: "Memo not found" });
            }
    
            res.json(updatedNote);
        } catch (error) {
            console.error("❌ Error updating memo:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },    

    async deleteNote(req, res) {
        try {
            await AdminNoteService.deleteNote(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = AdminNoteController;
