import express from "express";
import { isAuth } from "../midlewares/verify.js";
import { confirmTransaction, createTransaction } from "../controllers/webhook.js";
const router = express.Router();

router.post('/', confirmTransaction);
router.post('/checkout', isAuth, createTransaction);

export default router;