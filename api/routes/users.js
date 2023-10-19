import express from "express";
import { getBalance, updateUser } from "../controllers/user.js";
import { isAuth } from "../midlewares/verify.js";
const router = express.Router();

router.get("/", isAuth, getBalance)
router.put("/:id", isAuth, updateUser)


export default router;