import express from "express";
import { isAuth } from "../midlewares/verify.js";
import { confirmTransaction, createTransaction, lineAssignmentNotification, receiveMessageNotification } from "../controllers/webhook.js";
const router = express.Router();

router.post('/', confirmTransaction);
router.post('/checkout', isAuth, createTransaction);
router.post('/phoneblur/rentals/sms', receiveMessageNotification);
router.post('/phoneblur/rentals/assigned', lineAssignmentNotification);

export default router;