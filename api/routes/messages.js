import express from "express";
import { isAuth } from "../midlewares/verify.js";
import { addMessage, getMessages } from "../controllers/message.js";
const router = express.Router();

router.get("/:ticketId", isAuth, getMessages)
router.post("/", isAuth, addMessage)


export default router;