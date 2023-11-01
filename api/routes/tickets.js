import express from "express";
import { isAuth } from "../midlewares/verify.js";
import { createTicket, deleteTicket, getTickets, getTicketsByUser, ticketBytwoUser, updateTicket } from "../controllers/ticket.js";
const router = express.Router();

router.get("/", getTickets)
router.post("/", isAuth, createTicket)
router.put("/:id", isAuth, updateTicket);
router.delete("/:id", isAuth, deleteTicket);
router.get("/:userId", isAuth, getTicketsByUser)
router.get("/find/:firstUserId/:secondUserId", isAuth, ticketBytwoUser)


export default router;