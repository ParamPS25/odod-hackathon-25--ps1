import BaseUser from "../models/BaseUser.js";
import UserRating from "../models/Rating.js";

export const getUserProfile = async (req, res) => {
    try {
        const user = await BaseUser.findById(req.user._id)
            .select("-password -__v -createdAt -updatedAt")
            .populate("ratings", "rating feedback createdAt")
            .populate("ratings.rater", "username avatar")
            .populate("ratings.ratee", "username avatar");

        if (!user) {
            return res.status(404).json({ message: "User not found" }); 
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user profile", error });   
    }
};

// Update logged-in user profile
export const updateUserProfile = async (req, res) => {
    try {
        const allowedFields = [
            "username",
            "email",
            "gender",
            "skillsOffered",
            "skillsWanted",
            "avatar",
            "location",
            "availibility",
            "profileVisibility"
        ];

        const updates = {};

        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        const updatedUser = await BaseUser.findByIdAndUpdate(req.user._id, updates, {
            new: true,
            runValidators: true,
        }).select("-password");

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Failed to update profile", error });
    }
};

// Rate another user
export const rateUser = async (req, res) => {
    const { userId } = req.params;
    const { rating, feedback } = req.body;

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    try {
        // Optional: prevent rating yourself
        if (userId === req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot rate yourself" });
        }

        const newRating = await UserRating.create({
            rater: req.user._id,
            ratee: userId,
            rating,
            feedback
        });

        res.status(201).json({ message: "User rated successfully", rating: newRating });
    } catch (error) {
        res.status(500).json({ message: "Failed to rate user", error });
    }
};


export const getAllUsers = async (req, res) => {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = {
        username: { $regex: search, $options: "i" },
    };

    try {
        const totalUsers = await BaseUser.countDocuments(query);
        const users = await BaseUser.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .select("-password");

        res.json({
            total: totalUsers,
            page: parseInt(page),
            pages: Math.ceil(totalUsers / limit),
            users,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error });
    }
};


export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await BaseUser.findById(id)
            .select("-password -__v -createdAt -updatedAt")
            .populate("ratings", "rating feedback createdAt")
            .populate("ratings.rater", "username avatar")
            .populate("ratings.ratee", "username avatar");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user", error });
    }
}