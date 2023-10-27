import express from "express";
import { isAuth } from "../midlewares/verify.js";
import { 
    CreateTemperaryRental, 
    allTemperalRentals, 
    availableTargetForParmentSub, 
    createSingleLineSub, 
    getDetailsTemperalRental, 
    getLatestText, 
    getTemperalTargetsByLength } from "../controllers/rentals.js";
import { thirdPartyLogin } from "../controllers/auth.js";
const router = express.Router();

router.get("/reservations/catalog",thirdPartyLogin, availableTargetForParmentSub);
router.get("/reservations/catalog/all",thirdPartyLogin, allTemperalRentals);
router.get("/reservations/catalog/duration",thirdPartyLogin, getTemperalTargetsByLength);
router.get("/reservations/catalog/:subscriptionId", thirdPartyLogin, getDetailsTemperalRental);
router.post("/reservations/create", [isAuth,thirdPartyLogin], CreateTemperaryRental);
router.post("/single-service", [isAuth,thirdPartyLogin], createSingleLineSub);
router.get("/reservations/catalog/:weeks", isAuth, getTemperalTargetsByLength);
router.get("/incoming-text-messages", thirdPartyLogin, getLatestText);

export default router;