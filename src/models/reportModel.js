const db = require('../config/database');

// Function to generate a report code (example: 'REP1234')
const generateReportCode = () => {
    const prefix = 'REP';
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
    return `${prefix}${randomNumber}`;
};

// Function to ensure report_code is unique before insertion
const generateUniqueReportCode = (callback) => {
    const tryGenerate = () => {
        const newCode = generateReportCode();
        db.query('SELECT report_code FROM reports WHERE report_code = ?', [newCode], (err, results) => {
            if (err) return callback(err);
            if (results.length > 0) {
                // If code already exists, try again
                tryGenerate();
            } else {
                // Code is unique
                callback(null, newCode);
            }
        });
    };

    tryGenerate();
};

const ReportModel = {
    // Create a new report in the database
    createReport: (reportData, callback) => {
        const query = `INSERT INTO reports (id_user, report_code, department, location, subject, description, status) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const { id_user, department, location, subject, description, status } = reportData;

        // Generate a unique report code and insert the report
        generateUniqueReportCode((err, report_code) => {
            if (err) {
                console.error('Error generating unique report code:', err);
                return callback(err);
            }

            db.query(query, [id_user, report_code, department, location, subject, description, status || 'No leído'], (err, result) => {
                if (err) {
                    console.error('Error inserting report:', err.message || err);
                    return callback(err);
                }

                callback(null, { insertId: result.insertId, report_code });
            });
        });
    },

    // Get a report by its report code
    getReportByCode: (reportCode, callback) => {
        const query = `SELECT * FROM reports WHERE report_code = ?`;
        db.query(query, [reportCode], (err, results) => {
            if (err) {
                console.error('Error fetching report:', err.message || err);
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = ReportModel;
