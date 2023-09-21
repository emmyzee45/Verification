import User from "../models/User";

const getBalance = async() => {
    try {
        const res = await User.findById(req.params);
    }catch(err) {
        res.status(500).json(err);
    }
}