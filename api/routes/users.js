import express from "express";
import { updateUser } from "../controllers/user.js";
import { isAuth } from "../midlewares/verify.js";
const router = express.Router();

router.put("/:id", isAuth, updateUser)


export default router;