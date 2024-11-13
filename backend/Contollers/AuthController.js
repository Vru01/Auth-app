const { response } = require("express");
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/user");  // Import the UserModel correctly
const bcrypt = require('bcrypt');  // Import bcrypt from the correct package
const { use } = require("../Routes/AuthRouter");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: "User Already Exists",
                success: false
            });
        }

        // Create a new user instance
        const newUser = new UserModel({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);  // Hash the password

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            success: true
        });
    } catch (err) {
        console.error("Error during signup:", err);  // Log any errors for debugging
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;  // Remove `name` as it's not required for login

        // Check if the user already exists
        const user = await UserModel.findOne({ email });
        const errMsg = `Auth failed or wrong password`;
        if (!user) {
            return res.status(403).json({
                message: errMsg,
                success: false
            });
        }

        const isPassEqual = await bcrypt.compare(password, user.password); // Compare password hashes
        if (!isPassEqual) {
            return res.status(403).json({
                message: errMsg,
                success: false
            });
        }

        // Generate a JWT token
        const jwt_token = jwt.sign(
            { email: user.email, _id: user._id }, // Payload
            process.env.JWT_SECRET, // Secret key from .env file
            { expiresIn: '24h' } // Token expiration time (1 hour)
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            token: jwt_token, // Send the token to the client
            email: email,
            name : user.name
        });
    } catch (err) {
        console.error("Error during login:", err);  // Log any errors for debugging
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

module.exports = {
    signup,
    login
};
