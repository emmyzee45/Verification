import express from "express";
import { isAuth } from "../midlewares/verify.js";
import { 
    addMultiPurposeService,
    addSingleService,
    allTargetedReservation, 
    createSubscription, 
    disableReminders, 
    disableReservation, 
    enableReminders, 
    getAllSubcriptions, 
    getLatestText, 
    getRenewalCost, 
    getSubcription, 
    getTextBySubscription, 
    getWakeStatus, 
    refundReservation, 
    submitNewalCost, 
    targetedReservation, 
    wakeupReservation } from "../controllers/subscription.js";
const router = express.Router();

router.get("/", isAuth, getAllSubcriptions);
router.get("/:subscriptionId", isAuth, getSubcription);
router.post("/", isAuth, createSubscription);
router.get("/:subscriptionId/estimate-renewal-cost", isAuth, getRenewalCost);
router.post("/:subscriptionId/renew/submit", isAuth, submitNewalCost);
router.post("/:subscriptionId/reminders", isAuth, enableReminders);
router.delete("/:subscriptionId/reminders", isAuth, disableReminders);
router.get("/incoming-text-messages", isAuth, getLatestText);
router.get("/:subscriptionId/incoming-text-messages", isAuth, getTextBySubscription);
router.get("/:subscriptionId/reservations", isAuth, allTargetedReservation);
router.get("/:subscriptionId/reservations/:reservationId", isAuth, targetedReservation);
router.post("/:subscriptionId/reservations/:reservationId/renewal/exclude", isAuth, disableReservation);
router.post("/:subscriptionId/reservations/:reservationId/refund", isAuth, refundReservation);
router.post("/:subscriptionId/reservations/:reservationId/wake", isAuth, wakeupReservation);
router.get("/:subscriptionId/reservations/:reservationId/wake-status", isAuth, getWakeStatus);
router.post("/single-service", isAuth, addSingleService);
router.post("/multi-purpose-line", isAuth, addMultiPurposeService);

export default router;