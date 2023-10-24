import express from "express";
import { decreaseBalance, getBalance, getNotifications,  increaseBalance,  updateUser } from "../controllers/user.js";
import { isAuth } from "../midlewares/verify.js";
const router = express.Router();

router.get("/", getBalance)
router.put("/:id", isAuth, updateUser)
router.put("/increase/:id", isAuth, increaseBalance);
router.put("/decrease/:id", isAuth, decreaseBalance);
router.get("/notifications", getNotifications)


export default router;