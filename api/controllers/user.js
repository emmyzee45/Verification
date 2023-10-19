import User from "../models/User.js";

export const getBalance = async(res, req) => {
    try {
        const res = await User.findById(req.params.id);
        res.status(200).json(res);
    }catch(err) {
        res.status(500).json(err);
    }
}

export const updateUser = async(req,res) => {

    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json("User not found!");
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedUser);
    }catch(err) {
        res.status(500).json(err);
    }
}