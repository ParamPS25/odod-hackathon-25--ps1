import mongoose, { mongo } from "mongoose";

const offerSchema = new mongoose.Schema({
    SenderId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BaseUser',
    },
    ReceiverId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BaseUser',
    },
    offerdSkills: {
        type: [String],
        required: true,
    },
    wantedSKills: {
        type: [String],
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    message: {
        type: String,
        default: '',
    },
})

const Offer = mongoose.model("Offer", offerSchema);
export default Offer;