import express from "express";
import { protectRoute, checkRole } from "../middleware/authmiddleware.js";
import {
    getUserProfile,
    updateUserProfile,
    rateUser,
    // getAllUsersAdmin
} from "../controllers/userController.js";

const router = express.Router();

// GET user profile for logged-in user
router.get("/profile", protectRoute, getUserProfile);

// User: Update their own profile
router.put("/profile", protectRoute, updateUserProfile);

// User: Rate another user
router.post("/rate/:userId", protectRoute, rateUser);

// Admin: Get all users with pagination
// router.get("/", protectRoute, checkRole("admin"), getAllUsersAdmin);

export default router;
