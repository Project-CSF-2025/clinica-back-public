const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create the database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeout: 10000 // Optional: Set timeout to 10 seconds
});

// Connect and handle connection errors
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        process.exit(1); // Stop the application if the connection fails
    } else {
        console.log('Connected to the database successfully.');
    }
});

module.exports = db;
