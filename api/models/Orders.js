import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    transaction_id: {
        type: String,
        required: false
    },
    status: {
        type: String,
        default: "Created",
    },
    pay_amount: {
        type: Number,
        default: 0
    },
    receive_amount: {
        type: Number,
        default: 0
    },
    currency: {
        type: String,
        required: false
    },
    method: {
        type: String,
        required: false
    },
}, {timestamps: true});

export default mongoose.model("Order", OrderSchema);