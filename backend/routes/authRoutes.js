const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, role: 'Facilitator' });
        await newUser.save();
        res.status(201).json({ message: 'Account created. Awaiting admin approval.' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed.' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found.' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid credentials.' });

        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role, isApproved: user.isApproved },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.json({ token, user: { id: user._id, username: user.username, role: user.role, isApproved: user.isApproved } });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: 'Login failed.', details: error.message });
    }
});
module.exports = router;