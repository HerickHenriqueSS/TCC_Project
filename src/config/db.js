const musql = require('mysql2/promise');

const pool = musql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Hhss727699@',
    database: process.env.DB_NAME || 'service_mechenical_system',
});

module.exports = pool;