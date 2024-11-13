const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "22510039",
    database: "profile"
});

// db.connect(err => {
//     if (err) {
//         console.error('Error connecting to the database:', err.message);
//         return;
//     }
//     console.log('Connected to the MySQL database');
// });

module.exports = db;
