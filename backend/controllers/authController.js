const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const JWT_SECRET = "your_jwt_secret_key"; // Replace with your own secret key
const TOKEN_EXPIRES = "24h"; 
const createToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES });
}

exports.registerUser = async (req, res,) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({ 
            success: false,
            message: "Please fill all fields" 
        });
    }
    if(!validator.isEmail(email)) {
        return res.status(400).json({ 
            success: false,
            message: "Please enter a valid email" 
        });
    }
    if(password.length < 8) {
        return res.status(400).json({ 
            success: false,
            message: "Password must be at least 8 characters." 
        });
    }

    try {
        if(await User.findOne({ email })) {
            return res.status(400).json({ 
                success: false,
                message: "User already exists" 
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        const token = createToken(user._id);
        return res.status(201).json({ 
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            success: false,
            message: "Internal server error" 
        });
    }
}


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ 
            success: false,
            message: "Please fill all fields" 
        });
    }

    try {
        const user = await User.findOne({ email });
        console.log("USER FOUND:", user);
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const token = createToken(user._id);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("name email");
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


exports.updateUserProfile = async (req, res) => {
    const { name, email } = req.body;
    if(!name || !email || !validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid name and email"
        });
    }   
    try {
        const existingUser = await User.findOne({ email, _id: { $ne: req.user.userId } });
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already in use"
            });
        }
        const user = await User.findByIdAndUpdate(req.user.userId, { name, email }, { new: true, runValidators: true, select: "name email" });
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if(!currentPassword || !newPassword || newPassword.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid current password"
        });
    }
    try {
        const user = await User.findById(req.user.userId).select("password");
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if(!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }  

}