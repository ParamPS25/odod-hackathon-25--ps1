import BaseUser from "../models/BaseUser.js";


// Get paginated users with optional search
export const getAllUsers = async (req, res) => {
    const { page = 1, limit = 10, search = "" } = req.query;

    try {
        const query = {
            username: { $regex: search, $options: "i" },
        };

        const total = await BaseUser.countDocuments(query);
        const users = await BaseUser.find(query)
            .select("-password")
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.json({
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            users,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error });
    }
};

// Ban a user
export const banUser = async (req, res) => {
    try {
        const user = await BaseUser.findByIdAndUpdate(
            req.params.id,
            { isUserBanned: true },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.json({
            message: "User banned",
            user
        });

    } catch (error) {
        res.status(500).json({ message: "Failed to ban user", error });
    }
};

// Unban a user
export const unbanUser = async (req, res) => {
    try {
        const user = await BaseUser.findByIdAndUpdate(
            req.params.id,
            { isUserBanned: false },
            { new: true }
        );
        res.json({ message: "User unbanned", user });
    } catch (error) {
        res.status(500).json({ message: "Failed to unban user", error });
    }
};
