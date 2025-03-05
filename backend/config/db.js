const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST ,
    user: process.env.DB_USER ,
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_NAME
});
if (!db) {
    console.log('Error connecting to the database');
} else {
    console.log('Connected to the database') ;
}

module.exports = db;
