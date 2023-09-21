import mongoose from "mongoose";

const TextSchema = new mongoose.Schema({
    instantAvailability: {
        type: Boolean,
        default: false
    },
    alwaysOn: {
        type: Boolean,
        default: true
    },
    isAvailableForPermanentSub: {
        type: Boolean,
        default: false
    },
    duration: {
        type: String,
        required: false
    },
    totalCost: {
        type: Number,
        default: 0,
    },
    advertisedTargets: {
        type: Array,
    }
}, {timestamps: true});

export default mongoose.model("Target", TextSchema);