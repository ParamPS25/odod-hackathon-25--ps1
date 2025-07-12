import mongoose from "mongoose";

const userRatingSchema = new mongoose.Schema({
    rater: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "BaseUser", 
        required: true 
    },
    ratee: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "BaseUser", 
        required: true 
    },
    rating: { type: Number,
        required: true, 
        min: 1, 
        max: 5 
    },
    feedback: {
        type: String, 
        default: "" 
    },
}, {
    timestamps: true
});

export default mongoose.model("UserRating", userRatingSchema);
