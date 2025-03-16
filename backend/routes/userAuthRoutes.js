const express = require("express");
const passport = require('passport');
const jwt = require('jsonwebtoken');  // Import JWT
require('../config/passportConfig'); // Ensure Passport is configured
const {register} = require('../controllers/registerController')
const {login} = require('../controllers/loginController')


const generateToken = require('../utlis/jwt'); 

const router = express.Router();


// Google OAuth Login Route
router.get("/login/google", passport.authenticate('google', { scope: ['profile'] }));

// Google OAuth Callback Route
router.get('/login/google/callback',
    passport.authenticate('google', { failureRedirect:process.env.VITE_FRONTEND_LOGIN}),
    async (req, res) => {
        
        console.log("User from Google OAuth:", req.user); // Debugging log
        if (!req.user) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        // Generate JWT token
        const token = generateToken(req.user);
        console.log("token from google auth callback", token)

        // Set token as HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure only in production
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        console.log("Google OAuth Callback successful");

        res.redirect(process.env.VITE_FRONTEND); // Redirect to frontend
    }
);

// Route to check authentication and return user details
router.get('/', (req, res) => {
    const token = req.cookies.token; // Ensure cookie-parser is used
    console.log("token", token)

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ user: decoded });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }

        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Could not clear session" });
            }

            res.clearCookie('token'); // Clear the authentication token
            res.json({ message: "Logged out successfully" });
        });
    });
}); 

router.post('/register', register)
router.post('/login', login)

module.exports = router;
