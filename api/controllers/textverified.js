import axios from "axios";
const base_url = "https://www.textverified.com/api/pub/v2";

// GET LIST OF SERVICES
export const getListOfServices = async(req, res) => {
    const { numberType, reservationType } = req.query;
    try {
        const result = await axios.get(`${base_url}/services?numberType=${numberType}&reservationType=${reservationType}`, {
            headers: {"Authorization": `Bearer ${req.token}`}
        });
        res.status(200).json(result.data)
    }catch(err) {
        res.status(err.response.status).json(err.response.data);
    }
}

// GET RENTAL PRICE
export const getRentalPrice = async(req, res) => {
    try {
        const result = await axios.post(`${base_url}/pricing/rentals`,req.body, {
            headers: {"Authorization": `Bearer ${req.token}`}
        });
        res.status(200).json(result.data);
    }catch(err) {
        res.status(err.response.status).json(err.response.data);
    }
}

// CREATE NEW RENTAL
export const createNewRental = async(req, res) => {
    try {
        const result = await axios.post(`${base_url}/reservations/rental`,req.body, {
            headers: {"Authorization": `Bearer ${req.token}`}
        });
        res.status(200).json(result.data);
    }catch(err) {
        res.status(err.response.status).json(err.response.data);
    }
}

// LIST RENEWABLE RENTALS
export const listRenewableRentals = async(req, res) => {
    try {
        const result = await axios.get(`${base_url}/reservations/rental/renewable`, {
            headers: {"Authorization": `Bearer ${req.token}`}
        });
        res.status(200).json(result.data);
    }catch(err) {
        res.status(err.response.status).json(err.response.data);
    }
}

// REFUND RENEWABLE RENTALS
export const refundRenewableRental = async(req, res) => {
    try {
        const result = await axios.post(`${base_url}/reservations/rental/renewable/${req.params.id}/refund`, {
            headers: {"Authorization": `Bearer ${req.token}`}
        });
        res.status(200).json(result.data);
    }catch(err) {
        res.status(err.response.status).json(err.response.data);
    }
}

// UPDATE RENEWABLE RENTALS
export const updateRenewableRental = async(req, res) => {
    try {
        const result = await axios.post(`${base_url}/reservations/rental/renewable/${req.params.id}`,req.body, {
            headers: {"Authorization": `Bearer ${req.token}`}
        });
        res.status(200).json(result.data);
    }catch(err) {
        res.status(err.response.status).json(err.response.data);
    }
}

// GET RENEWABLE RENTALS DETAILS
export const getRenewableRentalDetails = async(req, res) => {
    try {
        const result = await axios.get(`${base_url}/reservations/rental/renewable/${req.params.id}`, {
            headers: {"Authorization": `Bearer ${req.token}`}
        });
        res.status(200).json(result.data);
    }catch(err) {
        res.status(err.response.status).json(err.response.data);
    }
}

// LIST NON RENEWABLE RENTALS
export const listNonRenewableRentals = async(req, res) => {
    try {
        const result = await axios.get(`${base_url}/reservations/rental/nonrenewable`, {
            headers: {"Authorization": `Bearer ${req.token}`}
        });
        res.status(200).json(result.data);
    }catch(err) {
        res.status(err.response.status).json(err.response.data);
    }
}

// REFUND NON RENEWABLE RENTALS
export const refundNonRenewableRental = async(req, res) => {
    try {
        const result = await axios.post(`${base_url}/reservations/rental/nonrenewable/${req.params.id}/refund`, {
            headers: {"Authorization": `Bearer ${req.token}`}
        });
        res.status(200).json(result.data);
    }catch(err) {
        res.status(err.response.status).json(err.response.data);
    }
}

// UPDATE NON RENEWABLE RENTALS
export const updateNonRenewableRental = async(req, res) => {
    try {
        const result = await axios.post(`${base_url}/reservations/rental/nonrenewable/${req.params.id}`,req.body, {
            headers: {"Authorization": `Bearer ${req.token}`}
        });
        res.status(200).json(result.data);
    }catch(err) {
        res.status(err.response.status).json(err.response.data);
    }
}

// GET NON RENEWABLE RENTALS DETAILS
export const getNonRenewableRentalDetails = async(req, res) => {
    try {
        const result = await axios.get(`${base_url}/reservations/rental/nonrenewable/${req.params.id}`, {
            headers: {"Authorization": `Bearer ${req.token}`}
        });
        res.status(200).json(result.data);
    }catch(err) {
        res.status(err.response.status).json(err.response.data);
    }
}

// GET A PAGINATED LIST OF YOUR RESRVATION SALES.
export const getReservationList = async(req, res) => {
    try {
        const result = await axios.get(`${base_url}/sales`, {
            headers: {"Authorization": `Bearer ${req.token}`}
        });
        res.status(200).json(result.data);
    }catch(err) {
        res.status(err.response.status).json(err.response.data);
    }
}

// GET THE DETAILS ON A RESERVATION SALE BY ID
export const reservationDetailsById = async(req, res) => {
    try {
        const result = await axios.get(`${base_url}/sales/${req.params.id}`, {
            headers: {"Authorization": `Bearer ${req.token}`}
        });
        res.status(200).json(result.data);
    }catch(err) {
        res.status(err.response.status).json(err.response.data);
    }
}

// GET THE DETAILS OF A BACK ORDER RESERVATION SALE BY ID
export const backOrderReservationDetails = async(req, res) => {
    try {
        const result = await axios.get(`${base_url}/backorders/${req.params.id}`, {
            headers: {"Authorization": `Bearer ${req.token}`}
        });
        res.status(200).json(result.data);
    }catch(err) {
        res.status(err.response.status).json(err.response.data);
    }
}

// GET THE DETAILS OF A WAKE REQUEST UP LINE BY ID
export const getWakeUpRequestDetails = async(req, res) => {
    try {
        const result = await axios.get(`${base_url}/wake-requests/${req.params.id}`, {
            headers: {"Authorization": `Bearer ${req.token}`}
        });
        res.status(200).json(result.data);
    }catch(err) {
        res.status(err.response.status).json(err.response.data);
    }
}

// CREATE WAKE REQUEST UP LINE
export const createWakeUpRequest = async(req, res) => {
    try {
        const result = await axios.post(`${base_url}/wake-requests/${req.params.id}`, req.body, {
            headers: {"Authorization": `Bearer ${req.token}`}
        });
        res.status(200).json(result.data);
    }catch(err) {
        res.status(err.response.status).json(err.response.data);
    }
}

// LIST BILLING CYCLES
export const listBillingCycles = async(req, res) => {
    try {
        const result = await axios.get(`${base_url}/billing-cycles`, {
            headers: {"Authorization": `Bearer ${req.token}`}
        });
        res.status(200).json(result.data);
    }catch(err) {
        res.status(err.response.status).json(err.response.data);
    }
}

// GET BILLING CYCLE DETAILS BY ID
export const billingCycleDetailsById = async(req, res) => {
    try {
        const result = await axios.get(`${base_url}/billing-cycles/${req.params.id}`, {
            headers: {"Authorization": `Bearer ${req.token}`}
        });
        res.status(200).json(result.data);
    }catch(err) {
        res.status(err.response.status).json(err.response.data);
    }
}

// UPDATE A BILLING CYCLE
export const updateBillingCycle = async(req, res) => {
    try {
        const result = await axios.post(`${base_url}/billing-cycles/${req.params.id}`,req.body, {
            headers: {"Authorization": `Bearer ${req.token}`}
        });
        res.status(200).json(result.data);
    }catch(err) {
        res.status(err.response.status).json(err.response.data);
    }
}

// GET THE LIST OF SMS
export const getListOfSms = async(req, res) => {
    const {reservationId, to, reservationType } = req.query;
    try {
        const result = await axios.get(`${base_url}/sms?to=${to}&reservationId=${reservationId}&reservationType=${reservationType}`, {
            headers: {"Authorization": `Bearer ${req.token}`}
        });
        res.status(200).json(result.data);
    }catch(err) {
        res.status(err.response.status).json(err.response.data);
    }
}

