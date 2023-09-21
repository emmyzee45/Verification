import express from "express";
import { isAuth } from "../midlewares/verify.js";
import { availableTargetForParmentSub, getTemperalTargets, getTemperalTargetsByLength } from "../controllers/rentals.js";
const router = express.Router();

router.get("/reservations/catalog", isAuth, getTemperalTargets);
router.get("/reservations/catalog/duration", isAuth, getTemperalTargetsByLength);
router.get("/reservations/catalog/:weeks", isAuth, getTemperalTargetsByLength);
router.get("/reservations/catalog", isAuth, availableTargetForParmentSub);

export default router;