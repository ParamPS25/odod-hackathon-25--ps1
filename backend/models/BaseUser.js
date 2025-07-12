import mongoose, { mongo } from "mongoose";

const baseUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [50, "Name can't exceed 50 characters"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address",
        ],
    },
    password: {
        type: String,
        required: true,
        minlength: [4, "Password must be at least 4 characters long"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    gender: {
        type : String,
        enum : ["male","female","other"],
        default : "male",
        required : true
    },
    location: {
        type: String,
        default: "",
        maxlength: [100, "Location can't exceed 100 characters"],
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dgdqt0m8f/image/upload/v1749210579/bagewwl8rsjibdlz8onx.webp",
    },
    skillsOffered:{
        type: [String],
        default: [],
        index: true 
    },
    skillsWanted:{
        type: [String],
        default: [],
        index: true 
    },
    availibility: {
        type: String,
        default: "Available",
        enum: ["weekdays", "weekends", "anytime", "unavailable"],
        default: "anytime",
        required: true,
    },
    profileVisibility: {
        type: String,
        enum: ["public", "private"],
        default: "public",
        required: true,
    },
    isUserBanned: {
        type: Boolean,
        default: false,
    },
    ipAddress: {
        type: String,
        required: true,
    },
    userAgent: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const BaseUser = mongoose.model("BaseUser", baseUserSchema);

export default BaseUser;