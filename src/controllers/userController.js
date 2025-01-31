const db = require('../config/database');

const getAllUsers = (req, res) => {
    console.log('Request received at /api/users');

    // Check if the database connection is available
    if (!db) {
        console.error('Database connection is not available.');
        return res.status(500).json({ error: 'Database connection failed.' });
    }

    // Query the database
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err.message);
            return res.status(500).json({ error: 'Database query failed.' });
        }

        // Check if results are empty
        if (results.length === 0) {
            return res.status(404).json({ message: 'No users found.' });
        }

        // Return the results
        res.status(200).json(results);
    });
};

module.exports = { getAllUsers };
