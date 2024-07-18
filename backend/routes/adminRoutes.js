const express = require('express');
const router = express.Router();
const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose'); // Ensure mongoose is required at the top
const jwt = require('jsonwebtoken');

// Secret key for JWT (store this securely, not in your code)
const JWT_SECRET = 'TAUFIK'; // Replace with your actual secret key

// Admin login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });

        // Respond with token
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


//get users 
router.get("/getuser", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
