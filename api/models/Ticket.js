import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    members: {
        type: Array,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "open"
    }
}, {timestamps: true});

export default mongoose.model("Ticket", TicketSchema);