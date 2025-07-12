// controllers/authController.js
import bcrypt from "bcrypt";
import BaseUser from "../models/BaseUser.js";
import { generateToken } from "../utils/jwtToken.js";

export const handleSignup = async (req, res) => {
    const { username, email, password, gender, location, role } = req.body;

    try {
        if (!username || !email || !password || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 4 || password.length > 32) {
            return res.status(400).json({ message: "Password must be between 4 and 32 characters" });
        }

        if (gender !== "male" && gender !== "female") {
            return res.status(400).json({ message: "Invalid gender" });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }

        if (username.length < 3 || username.length > 20) {
            return res.status(400).json({ message: "Username must be between 3 and 20 characters" });
        }

        if (location && location.length > 100) {
            return res.status(400).json({ message: "Location must be less than 100 characters" });
        }

        const existingUser = await BaseUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new BaseUser({
            username,
            email,
            password: hashedPassword,
            gender,
            location,
            ipAddress: req.ip || req.headers["x-forwarded-for"] || "Unknown",
            userAgent: req.headers["user-agent"] || "Unknown",
            role: "user" // default role
        });

        if (req.forceAdmin) {
            newUser.role = "admin";
        } else if (role && role === "admin") {
            return res.status(403).json({ message: "Admin signup not allowed from this route" });
        }

        generateToken(newUser._id, newUser.email, res);
        await newUser.save();

        const userToSend = newUser.toObject();
        delete userToSend.password;

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: userToSend
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

export const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await BaseUser.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // For admin login, enforce admin role
        if (req.forceAdmin && user.role !== "admin") {
            return res.status(403).json({ message: "Access denied: Not an admin" });
        }

        generateToken(user._id, user.email, res);

        const userToSend = user.toObject();
        delete userToSend.password;

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: userToSend
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

export const handleLogout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            expires: new Date(0),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        res.status(200).json({ success: true, message: "Logged out successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

export const handleCheckAuth = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "User is authenticated",
            user: req.user
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};
