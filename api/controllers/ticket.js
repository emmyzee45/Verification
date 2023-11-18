import User from "../models/User.js"
import Ticket from "../models/Ticket.js"
import Message from "../models/Message.js"
import sendEmail from "../utils/sendEmail.js";


// CREATE TICKET
export const createTicket = async(req, res) => {
  const { sender, msg, title } = req.body;
  if(!sender || !msg || !title) return res.status(400).json("All fields are required");

  try {
      const admin = await User.find({isAdmin: true}, { 
        projection: {
            id: {$toString: "$_id" },

        }
    });
      const members = [sender, ...admin.map((item) => item.id)];
      
      const newTicket = new Ticket({
        members,
        title,
      });

      const saveTicket = await newTicket.save();
      const newMsg = new Message({
        ticketId: saveTicket._id,
        text: msg,
        sender,
      });
      await newMsg.save();

      const ticketUrl = `${process.env.FRONTEND_URL}/support`;

      // Send Email
      const subject = "Ticket booking";
      const send_to = process.env.EMAIL_USER;
      const sent_from = process.env.EMAIL_USER;
      const reply_to = req.user.email;
      const template = "changeRole";
      const name = req.user.name;
      const link = ticketUrl;

      await sendEmail(
        subject,
        send_to,
        sent_from,
        reply_to,
        template,
        name,
        link
      );

      res.status(200).json(saveTicket);
    }catch(err) {
        res.status(500).json(err);
    }
}

// UPDATE TICKET
export const updateTicket = async(req, res) => {
    try {
        const updateTicket = await Ticket.findByIdAndUpdate(req.params.id, 
            {
                $set: req.body
            }, 
            { new: true }
        )
        res.status(200).json(updateTicket)
    }catch(err) {
        res.status(500).json(err)
    }
}

//DELETE
export const deleteTicket = async(req, res) => {
    try {
      await Ticket.findByIdAndDelete(req.params.id);
      await Message.deleteMany({ticketId: req.params.id})
      res.status(200).json("Ticket has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  //GET USER TicketS
  export const getTicketsByUser = async (req, res) => {
    try {
      const tickets = await Ticket.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(tickets);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  // //GET ALL
  
  export const ticketBytwoUser = async (req, res) => {
    try {
      const tickets = await Ticket.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(tickets)
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // //GET ALL
  
  export const getTickets = async (req, res) => {
    try {
      const tickets = await Ticket.find();
      res.status(200).json(tickets);
    } catch (err) {
      res.status(500).json(err);
    }
  };