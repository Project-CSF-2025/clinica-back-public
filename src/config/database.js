require('dotenv').config();
const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST, // e.g., localhost\\SQLEXPRESS
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  options: {
    encrypt: false, // Set to true if using Azure or SSL
    trustServerCertificate: true
  },
  connectionTimeout: 10000
};


console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

poolConnect
  .then(() => {
    console.log('✅ Connected to SQL Server successfully.');
  })
  .catch((err) => {
    console.error('❌ Error connecting to the database:', err.message);
    process.exit(1);
  });

module.exports = {
  sql,
  pool,
  poolConnect
};
