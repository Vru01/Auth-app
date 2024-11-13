
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '22510039',
  database: 'AcademicsPL'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Successfully connected to MySQL database');
});

// Function to create table
function createTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS employees (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      department VARCHAR(50),
      salary DECIMAL(10, 2)
    )`;

  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log('Table created successfully');
  });
}

// Function to insert sample data
function insertData() {
  const insertDataQuery = `
    INSERT INTO employees (name, email, department, salary) VALUES
    ('John Doe', 'john@example.com', 'IT', 75000.00),
    ('Jane Smith', 'jane@example.com', 'HR', 65000.00),
    ('Mike Johnson', 'mike@example.com', 'Finance', 80000.00)`;

  connection.query(insertDataQuery, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return;
    }
    console.log('Data inserted successfully:', results.affectedRows, 'rows affected');
  });
}

// Function to retrieve and display data
function displayData() {
  const selectQuery = 'SELECT * FROM employees';

  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error retrieving data:', err);
      return;
    }
    console.log('\nEmployee Data:');
    console.table(results);
  });
}

// Execute operations in sequence
createTable();
setTimeout(() => {
  // insertData();
  setTimeout(displayData, 1000);
}, 1000);

// Close connection when done
setTimeout(() => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing connection:', err);
      return;
    }
    console.log('Connection closed successfully');
  });
}, 3000);
