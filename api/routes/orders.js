import express from "express";
import { isAuth } from "../midlewares/verify.js";
import { creatOrder, deleteOrder, getOrders, getOrdersByUser, updatedOrder } from "../controllers/order.js";
const router = express.Router();

router.get("/", getOrders)
router.post("/", isAuth, creatOrder)
router.get("/:userId", isAuth, getOrdersByUser)
router.put("/:id", isAuth, updatedOrder);
router.delete("/:id", isAuth, deleteOrder);


export default router;