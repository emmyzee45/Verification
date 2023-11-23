import dotenv from "dotenv";
import coinbase from "coinbase-commerce-node";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Text from "../models/Text.js";
import Notification from "../models/Notification.js";
import sendEmail from "../utils/sendEmail.js";

dotenv.config();
const Client = coinbase.Client;
const clientObj = Client.init(process.env.API_KEY);
clientObj.setRequestTimeout(3000);
const resources = coinbase.resources;
const Webhook = coinbase.Webhook;

export const createTransaction = async(req, res) => {
    const { amount, currency, user_id, email } = req.body;

    if(user_id !== req.user.id || !amount || !currency || !email) return res.status(400).json("Invalid parameters");
    const order = new Order({
        user_id,
        method: "Crypto"
    })
    try {
        const newOrder = await order.save();
        const charge = await resources.Charge.create({
            name: "Balance Topup",
            description: "balance Topup description",
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
        console.log(err)
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
                    status: "CONFIRMED",
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
                    status: "RESOLVED",
                    transaction_id, 
                }
            }
        )
        res.status(200).json("Successfully resolved Topup");
    } else if(event.type === "charge:pending") {
        let order_id = event.data.metadata.order_id;
        await Order.findByIdAndRemove(order_id, { $set: { status: 'pending'}});
        res.status(200).json("Successfully received pending");
    } else if(event.type === "charge:failed") {
        let order_id = event.data.metadata.order_id;
        await Order.findByIdAndRemove(order_id, { $set: { status: 'failed'}});
        res.status(200).json("Successfully received failed payment");
    } else if(event.type === "charge:created") {
        res.status(200).json("Successfully create payment");
    } else if(event.type === "charge:delayed") {
        res.status(200).json("Successfully received delayed payment");
    }
}

export const receiveMessageNotification = async(req, res) => {
    console.log("message received from phoneblur")
    console.log(req.body)
    try {
        await Promise.all(
            req.body.map(async(item)=> {
                try {
                    const newMessage = new Text(item);
                    await newMessage.save();
                }catch(err) {
                }
            })
        )
        res.status(200).json('Message received');
    }catch(err) {
        res.status(500).json(err);
    }
}

export const lineAssignmentNotification = async(req, res) => {
    console.log("notification from phoneblur", req.body)
    const subscriptionUrl = `${process.env.FRONTEND_URL}/subscriptions`;

    try {
        await Promise.all(
            req.body.map(async(item) => {
                try {
                    const newNotification = new Notification(item);
                    await newNotification.save();
                    const user = await User.findOne({subscriptionIds: {$in: [item.subscriptionId]}});

                    // Send Email
                    const subject = "Subscription renewal - SUPPORT:Z";
                    const send_to = user.email;
                    const sent_from = process.env.EMAIL_USER;
                    const reply_to = "noreply@simver.net";
                    const template = "renew";
                    const name = user.name;
                    const link = subscriptionUrl;

                    await sendEmail(
                        subject,
                        send_to,
                        sent_from,
                        reply_to,
                        template,
                        name,
                        link
                      );

                }catch(err){
                }
            })
        )
       
        res.status(200).json("Notification received")
    }catch(err) {
        res.status(500).json(err);
    }
}
