const { Pool } = require('pg');
require('dotenv').config();

// Construct the connection string from individual environment variables
// This is more secure than storing the full connection string with credentials
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

module.exports = pool;