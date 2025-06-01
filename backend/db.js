const { Poll } = require('pg');
require('dotenv').config();

const pool = new Poll({
    connectionString: process.env.DATABASE_URL,
});

module.exports = pool;