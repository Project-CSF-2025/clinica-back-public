const mysql = require('mysql2'); // Ensure you're using mysql2
const dotenv = require('dotenv');

dotenv.config();

// Create the MySQL database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test the connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        process.exit(1); // Exit the process if the connection fails
    } else {
        console.log('Connected to the database successfully.');
    }
});

module.exports = db;
