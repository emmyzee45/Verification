import User from "../models/User.js";

const getBalance = async() => {
    try {
        const res = await User.findById(req.params);
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