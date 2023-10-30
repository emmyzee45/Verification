import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    cost: {
        type: Number,
    },
    target_name: {
        type: String,
        required: false,
    },
    assignedMDN: {
        type: String,
        required: false,
    },
    subscriptionId: {
        type: String,
        required: false,
    },
}, {timestamps: true});

export default mongoose.model("Notification", NotificationSchema);