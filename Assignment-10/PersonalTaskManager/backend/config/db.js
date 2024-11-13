const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "22510039",
  database: "taskmanager",
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
  connection.release();
});

module.exports = db;
