import Ticket from "../models/Ticket.js"

// CREATE TICKET
export const createTicket = async(req, res) => {
  const { members, msg, title } = req.body;
  if(!members || !msg || !title) return res.status(400).json("All fields are required");

    const newTicket = new Ticket(req.body);
    try {
        const saveTicket = await newTicket.save();
        res.status(200).json(saveTicket)
    }catch(err) {
        res.status(500).json(err);
        console.log(err)
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