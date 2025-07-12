import Offer from "../models/Offers.js";
import BaseUser from "../models/BaseUser.js";
import Feedback from "../models/FeedBack.js";

export const createOffer = async (req, res) => {
    const { ReceiverId, offerdSkills, wantedSKills, message } = req.body;

    try {

        // Block if a pending or accepted offer already exists
        const existingOffer = await Offer.findOne({
            SenderId: req.user._id,
            ReceiverId, 
            status: { $in: ["pending", "accepted"] },
        });

        if (existingOffer) {
            return res.status(400).json({
                message: "You have already sent an offer to this user that is pending or accepted."
            });
        }


        if (existingOffer) {
            return res.status(400).json({
                message: "You have already sent an offer to this user"
            });
        }

        const newOffer = await Offer.create({
            SenderId: req.user._id,
            ReceiverId,
            offerdSkills,
            wantedSKills,
            message,
        });
        res.status(201).json(newOffer);

    } catch (error) {
        res.status(500).json({
            message: "Failed to create offer",
            error
        });
    }
};


export const getUserOffers = async (req, res) => {
    try {
        const sent = await Offer.find({ SenderId: req.user._id })
            .populate("ReceiverId", "username");
        const received = await Offer.find({ ReceiverId: req.user._id })
            .populate("SenderId", "username");

        res.status(200).json({
            success: true,
            sent,
            received
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get offers",
            error
        });
    }
};

export const respondToOffer = async (req, res) => {
    const { offerId } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
        return res.status(400).json({
            message: "Invalid status"
        });
    }

    try {
        const offer = await Offer.findById(offerId);

        if (!offer) return res.status(404).json({
            message: "Offer not found"
        });

        if (!offer.ReceiverId.equals(req.user._id)) {
            return res.status(403).json({
                message: "Not authorized to respond to this offer"
            });
        }

        offer.status = status;
        await offer.save();

        res.status(200).json({
            message: `Offer ${status}`
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to respond to offer",
            error
        });
    }
};


// Delete offer (only if not accepted)
export const deleteOffer = async (req, res) => {
    const { offerId } = req.params;

    try {
        const offer = await Offer.findById(offerId);
        if (!offer) return res.status(404).json({ message: "Offer not found" });

        const isSender = offer.SenderId.equals(req.user._id);

        if (!isSender) {
            return res.status(403).json({ message: "Not authorized to delete this offer" });
        }

        if (offer.status === "accepted") {
            return res.status(400).json({ message: "Can't delete accepted offer" });
        }

        await Offer.findByIdAndDelete(offerId);
        res.json({ message: "Offer deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete offer", error });
    }
};


