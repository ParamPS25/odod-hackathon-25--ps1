import express from "express";
import {
    createOffer,
    getUserOffers,
    respondToOffer,
    deleteOffer
} from "../controllers/offerController.js";

import { protectRoute } from "../middleware/authmiddleware.js";

const router = express.Router();

// POST a new offer
router.post("/", protectRoute, createOffer);

// GET all offers for logged-in user (sent + received)
router.get("/", protectRoute, getUserOffers);

// PUT : Accept or reject an offer
router.put("/:offerId", protectRoute, respondToOffer);

// DELETE offer (only if not accepted)
router.delete("/:offerId", protectRoute, deleteOffer);

export default router;
