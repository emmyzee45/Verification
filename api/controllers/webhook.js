import dotenv from "dotenv";
import coinbase from "coinbase-commerce-node";
import User from "../models/User.js";

dotenv.config();
const Client = coinbase.Client;
const clientObj = Client.init(process.env.API_KEY);
clientObj.setRequestTimeout(3000);
const resources = coinbase.resources;
const Webhook = coinbase.Webhook;

export const createTransaction = async(req, res) => {
    const { amount, currency, user_id } = req.body;

    if(user_id !== req.user.id || !amount || !currency) return res.status(400).json("Invalid parameters");

    try {
        const charge = await resources.Charge.create({
            name: "Test Charge",
            description: "Test charge description",
            local_price: {
                amount,
                currency,
            },
            pricing_type: "fixed_price",
            metadata: {
                user_id,
            }
        });
        res.status(200).json(charge);
    }catch(err) {
        res.status(500).json(err);
    }
}

export const confirmTransaction = async(req, res) => {
    const event = Webhook.verifyEventBody(
        req.rawBody,
        req.headers['x-cc-webhook-signature'],
        process.env.WEBHOOK_SECRET
    );

    if(event.type === "charge:confirmed") {
        let amount = event.data.pricing.local.amount;
        let currency = event.data.pricing.local.currency;
        let user_id = event.data.metadata.user_id;

        console.log(amount, currency, user_id);
        await User.findByIdAndUpdate(user_id, { $inc: { balance: amount }});
        res.status(200).json("Successfully topup account");
    }
}