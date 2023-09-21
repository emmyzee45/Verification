import express from "express";
import { login, refreshBearerToken, register } from "../controllers/auth.js";
import { isAuth } from "../midlewares/verify.js";

const router = express.Router();

router.post("/", login);
router.post("/refresh-token", refreshBearerToken);
router.post("/register", register);

export default router;