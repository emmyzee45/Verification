import dotenv from "dotenv";
import coinbase from "coinbase-commerce-node";
import User from "../models/User.js";
import Order from "../models/Orders.js";

dotenv.config();
const Client = coinbase.Client;
const clientObj = Client.init(process.env.API_KEY);
clientObj.setRequestTimeout(3000);
const resources = coinbase.resources;
const Webhook = coinbase.Webhook;

export const createTransaction = async(req, res) => {
    const { amount, currency, user_id, email } = req.body;

    if(user_id !== req.user.id || !amount || !currency || !email) return res.status(400).json("Invalid parameters");
    const order = Order.create({
        user_id,
        method: "Crypto"
    })
    try {
        const newOrder = await order.save();
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
                user_email: email,
                order_id: newOrder._id
            }
        });
        // console.log(charge)
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
        let user_id = event.data.metadata.user_id;
        let order_id = event.data.metadata.order_id;
        const transaction_id = event.data.payments[0].transaction_id;
        const usd_amount = event.data.payments[0].value.local.amount;
        const crypto_amount = event.data.payments[0].value.crypto.amount;
        const crypto_currency = event.data.payments[0].value.crypto.currency;
        await User.findByIdAndUpdate(user_id, { $inc: { balance: amount }});
        await Order.findByIdAndUpdate(order_id, 
            { $set: {
                    pay_amount: crypto_amount, 
                    currency: crypto_currency, 
                    receive_amount: usd_amount,
                    status: "confirmed",
                    transaction_id, 
                }
            }
        )
        res.status(200).json("Successfully topup account");
    } else if(event.type === "charge:resolved") {
        let amount = event.data.pricing.local.amount;
        let user_id = event.data.metadata.user_id;
        let order_id = event.data.metadata.order_id;
        const transaction_id = event.data.payments[0].transaction_id;
        const usd_amount = event.data.payments[0].value.local.amount;
        const crypto_amount = event.data.payments[0].value.crypto.amount;
        const crypto_currency = event.data.payments[0].value.crypto.currency;
        await User.findByIdAndUpdate(user_id, { $inc: { balance: amount }});
        await Order.findByIdAndUpdate(order_id, 
            { $set: {
                    pay_amount: crypto_amount, 
                    currency: crypto_currency, 
                    receive_amount: usd_amount,
                    status: "resolved",
                    transaction_id, 
                }
            }
        )
        res.status(200).json("Successfully topup account");
    } else if(event.type === "charge:pending") {
        let order_id = event.data.metadata.order_id;
        await Order.findByIdAndRemove(order_id, { $set: { status: 'pending'}});
        res.status(200)
    } else if(event.type === "charge:failed") {
        let order_id = event.data.metadata.order_id;
        await Order.findByIdAndRemove(order_id, { $set: { status: 'failed'}});
        res.status(200)
    }
}