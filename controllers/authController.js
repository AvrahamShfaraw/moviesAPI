const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// REGISTER
const registerUser = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const userExists = await User.findOne({ userName });
        if (userExists) return res.status(400).json({ error: "User already exists" });

        const user = await User.create({ userName, password });
        res.status(201).json({
            _id: user._id,
            userName: user.userName,
            token: generateToken(user._id)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LOGIN
const loginUser = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await User.findOne({ userName });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        res.json({
            _id: user._id,
            userName: user.userName,
            token: generateToken(user._id)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { registerUser, loginUser };
