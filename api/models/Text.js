import mongoose from "mongoose";

const TextSchema = new mongoose.Schema({
    lineNumber: {
        type: String,
        required: false,
    },
    lineType: {
        type: String,
        required: false,
    },
    reservationId: {
        type: String,
        required: false,
    },
    subscriptionId: {
        type: String,
        required: false,
    },
    fullPayloadValue: {
        type: String,
        required: false,
    },
    parsedCode: {
        type:String,
        required: false,
    },
    target: {
        type: String,
        required: true, 
        },
    sentAt: {
        type: Date,
        default: Date.now(),
    },
    sentFrom: {
        type: String,
        required: false,
    },
}, {timestamps: true});

export default mongoose.model("Text", TextSchema);