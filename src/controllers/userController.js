const db = require('../config/database');

const getAllUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err.message);
            return res.status(500).json({ error: 'An error occurred.' });
        }
        res.json(results);
    });
};

module.exports = { getAllUsers };
