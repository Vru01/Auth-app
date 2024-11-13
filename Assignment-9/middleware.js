const express = require('express');
const mysql = require('mysql2');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '22510039',
  database: 'AcademicsPL'
});

connection.connect((err) => {
  if (err) {
  console.error('Error connecting to MySQL:', err);
  return;
  }
  console.log('Connected to MySQL database');
});

const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
  res.status(401).json({ error: 'Authentication required' });
  return;
  }
  
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  
  if (username === 'admin' && password === 'password') {
  next();
  } else {
  res.status(401).json({ error: 'Invalid credentials' });
  }
};

const dbConnectionCheck = (req, res, next) => {
  if (connection.state === 'disconnected') {
  res.status(503).json({ error: 'Database connection unavailable' });
  return;
  }
  next();
};

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
};

app.use(express.json());
app.use(requestLogger);

app.get('/employees', basicAuth, dbConnectionCheck, (req, res) => {
  connection.query('SELECT * FROM employees', (err, results) => {
  if (err) {
    next(err);
    return;
  }
  res.json(results);
  });
});

app.post('/employees', basicAuth, dbConnectionCheck, (req, res, next) => {
  const { name, email, department, salary } = req.body;
  
  const query = 'INSERT INTO employees (name, email, department, salary) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, email, department, salary], (err, results) => {
  if (err) {
    next(err);
    return;
  }
  res.status(201).json({ 
    message: 'Employee added successfully', 
    id: results.insertId 
  });
  });
});

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGINT', () => {
  connection.end(() => {
  console.log('MySQL connection closed');
  process.exit(0);
  });
});
