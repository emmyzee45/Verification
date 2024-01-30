import mongoose from "mongoose";

const TextSchema = new mongoose.Schema({
    reservationId: {
        type: String,
        required: false,
    },
    encrypted: {
        type: Boolean,
        default: false,
    },
    smsContent: {
        type: String,
        required: false,
    },
    parsedCode: {
        type: String,
        required: false,
    },
    to: {
        type: String,
        required: false,
    },
    from: {
        type: String,
        required: false,
    },
    createdAt: {
        type: String,
        required: false,
    },
}, {timestamps: true});

export default mongoose.model("Text", TextSchema);