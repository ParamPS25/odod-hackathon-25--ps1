import express from "express";
import {
    getAllUsers,
    banUser,
    unbanUser,
} from "../controllers/adminController.js";

import { protectRoute, checkRole } from "../middleware/authmiddleware.js";

const router = express.Router();

// Only admin can access these routes
router.use(protectRoute, checkRole("admin"));

// GET all users with pagination/search
router.get("/users", getAllUsers);

// PUT ban a user
router.put("/users/:id/ban", banUser);

// PUT unban a user
router.put("/users/:id/unban", unbanUser);

export default router;
