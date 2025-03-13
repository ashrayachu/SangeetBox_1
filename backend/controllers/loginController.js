const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require('../utlis/jwt');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = generateToken(user); // Generate JWT token
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure only in production
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { login };
