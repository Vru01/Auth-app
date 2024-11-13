const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT creation
const db = require('../config/db'); // Database connection

// User registration controller
const registerUser = async (req, res) => {
    const { name, email, password, phone, address } = req.body;

    // Check if the user already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Insert new user into the database
        db.query('INSERT INTO users (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)', [name, email, hashedPassword, phone, address], (err) => {
            if (err) {
                console.error('Failed to register user:', err);
                return res.status(500).json({ error: 'Failed to register user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
};

// User login controller
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Query the database to find the user by email
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'User not found' });
        }

        const user = results[0];

        // Compare the provided password with the stored hashed password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
        res.json({ token });
    });
};

// Export the controller functions
module.exports = {
    registerUser,
    loginUser,
};
