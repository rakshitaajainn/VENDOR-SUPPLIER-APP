// routes/index.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Show registration page
router.get('/register', (req, res) => {
    res.render('register');
});

// Handle registration form submission
router.post('/register', async (req, res) => {
    const { name, email, mobile, password, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.send('User already exists');
        }
        user = new User({ name, email, mobile, password, role });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Show login page
router.get('/login', (req, res) => {
    res.render('login');
});

// Handle login form submission
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.send('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send('Invalid credentials');
        }
        // Save user info in session
        req.session.userId = user._id;
        req.session.role = user.role;
        res.redirect('/profile'); // Redirect to their profile page
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Profile Page
router.get('/profile', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    const user = await User.findById(req.session.userId);
    res.render('profile', { user });
});

module.exports = router;
