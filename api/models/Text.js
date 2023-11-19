import mongoose from "mongoose";

const TextSchema = new mongoose.Schema({
    reservationId: {
        type: String,
        required: false,
    },
    lineNumber: {
        type: String,
        required: false,
    },
    fullPayloadValue: {
        type: String,
        required: false,
    },
    parsedCode: {
        type: String,
        required: false,
    },
    target: {
        type: String,
        required: false,
    },
    sentAt: {
        type: String,
        required: false,
    },
    sentFrom: {
        type: String,
        required: false,
    },
    subscriptionId: {
        type: String,
        required: false,
    },
}, {timestamps: true});

export default mongoose.model("Text", TextSchema);