import {Router} from "express";
import { 
    backOrderReservationDetails,
    billingCycleDetailsById, 
    createNewRental, 
    createWakeUpRequest, 
    getListOfServices, 
    getListOfSms, 
    getNonRenewableRentalDetails, 
    getRenewableRentalDetails, 
    getRentalPrice, 
    getReservationList, 
    getWakeUpRequestDetails, 
    listBillingCycles, 
    listNonRenewableRentals, 
    listRenewableRentals, 
    refundNonRenewableRental, 
    refundRenewableRental, 
    reservationDetailsById, 
    updateBillingCycle,
    updateNonRenewableRental,
    updateRenewableRental} from "../controllers/textverified.js";
import { thirdPartyLogin } from "../controllers/auth.js";

const router = Router();

router.get("/services", thirdPartyLogin, getListOfServices);
router.post("/price", thirdPartyLogin, getRentalPrice);
router.get("/reservation", thirdPartyLogin, getReservationList);
router.get("/reservation/:id", thirdPartyLogin, reservationDetailsById);
router.post("/reservation/wakeup", thirdPartyLogin, createWakeUpRequest);
router.get("/reservation/wakeup/:id", thirdPartyLogin, getWakeUpRequestDetails);
router.get("/backorders/:id", thirdPartyLogin, backOrderReservationDetails);
router.post("/rental", thirdPartyLogin, createNewRental);
router.get("/rental/renewable", thirdPartyLogin, listRenewableRentals);
router.get("/rental/renewable/:id", thirdPartyLogin, getRenewableRentalDetails);
router.put("/rental/renewable/:id", thirdPartyLogin, updateRenewableRental);
router.post("/rental/renewable/:id/refund", thirdPartyLogin, refundRenewableRental);
router.get("/rental/nonrenewable", thirdPartyLogin, listNonRenewableRentals);
router.get("/rental/nonrenewable/:id", thirdPartyLogin, getNonRenewableRentalDetails);
router.put("/rental/nonrenewable/:id", thirdPartyLogin, updateNonRenewableRental);
router.post("/rental/nonrenewable/:id/refund", thirdPartyLogin, refundNonRenewableRental);
router.get("/billing", thirdPartyLogin, listBillingCycles);
router.get("/billing/:id", thirdPartyLogin, billingCycleDetailsById);
router.post("/billing/:id", thirdPartyLogin, updateBillingCycle);
router.get("/sms", thirdPartyLogin, getListOfSms);

export default router;