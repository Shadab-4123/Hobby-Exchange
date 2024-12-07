// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

// Register a new user
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const lowercaseEmail = email.toLowerCase().trim();
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: lowercaseEmail });
        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });

        // Hash the password
        // const hashedPassword = password //await bcrypt.hash(password, 10);

        // Create and save the user
        const user = new User({ username, email: lowercaseEmail, password });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with token and user details
        res.status(201).json({ token, user: { id: user._id, username, email: lowercaseEmail } });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password, 'email:', email, 'password:', password);
    const lowercaseEmail = email.toLowerCase().trim();
    try {
        // Find user by email
        const user = await User.findOne({ email: lowercaseEmail });
        if (!user)
            return res.status(400).json({ message: 'Invalid credentials' });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with token and user details
        res.status(200).json({ token, user: { id: user._id, username: user.username, email: lowercaseEmail } });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
