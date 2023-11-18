import  express from "express";
import User from "../models/User.js";
import Message from "../models/Message.js";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

//add message
export const addMessage = async (req, res) => {
  const { ticketId, sender, text, sendto } = req.body;
  if(!ticketId || !sender || !text ) return res.status(400).json("All fields are required");
  
  const newMessage = new Message(req.body);
  const user = await User.findById(sendto)

  const ticketUrl = `${process.env.FRONTEND_URL}/support`;

   // Send Email
   const subject = "Ticket booking";
   const send_to = user.email;
   const sent_from = process.env.EMAIL_USER;
   const reply_to = process.env.EMAIL_USER;
   const template = "reply";
   const name = user.name;
   const link = ticketUrl;

  try {
    const savedMessage = await newMessage.save();

     await sendEmail(
       subject,
       send_to,
       sent_from,
       reply_to,
       template,
       name,
       link
     );
    res.status(200).json(savedMessage);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
};

//get messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      ticketId: req.params.ticketId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

export default router;
