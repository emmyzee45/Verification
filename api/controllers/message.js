import  express from "express";
import Message from "../models/Message.js";

const router = express.Router();

//add message
export const addMessage = async (req, res) => {
  const { ticketId, sender, text } = req.body;
  if(!ticketId || !sender || !text ) return res.status(400).json("All fields are required");
  
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
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
