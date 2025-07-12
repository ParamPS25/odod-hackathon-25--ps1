// routes/adminAuthRoutes.js
import express from "express";
import {
  handleSignup,
  handleLogin
} from "../controllers/authController.js";

const router = express.Router();

// Admin-only signup route
router.post("/signup", (req, res, next) => {
  req.forceAdmin = true;
  handleSignup(req, res, next);
});

// Admin-only login route
router.post("/login", (req, res, next) => {
  req.forceAdmin = true;
  handleLogin(req, res, next);
});

export default router;
