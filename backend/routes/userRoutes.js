import express from "express";
import { protectRoute, checkRole } from "../middleware/authmiddleware.js";
import {
    getUserProfile,
    updateUserProfile,
    rateUser,
    getAllUsers,
    getUserById
} from "../controllers/userController.js";

const router = express.Router();

// GET user profile for logged-in user
router.get("/profile", protectRoute, getUserProfile);

// User: Update their own profile
router.put("/profile", protectRoute, updateUserProfile);

// User: Rate another user
router.post("/rate/:userId", protectRoute, rateUser);

// get all users
router.get("/all", protectRoute, getAllUsers);

// Admin: Get all users with pagination
// router.get("/", protectRoute, checkRole("admin"), getAllUsersAdmin);

router.get("/:id", protectRoute, getUserById);

export default router;
