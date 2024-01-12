const { createPool } = require('mysql2');
require('dotenv').config()

const pool = createPool(
    {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB
    }
)

module.exports = pool