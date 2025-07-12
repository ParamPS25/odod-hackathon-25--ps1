const feedbackSchema = new mongoose.Schema({
    fromUser: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'BaseUser', 
         required: true 
    },
    toUser: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'BaseUser', 
        required: true 
    },
    offerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Offer' 
    }, 
    rating: {
        type: Number,
        min: 1,
        max: 5, 
        required: true 
    },
    comment: {
        type: String, 
        default: "" 
    },
}, { timestamps: true });
