import User from "../models/User.js";
import axios from "axios";

const base_url = "https://www.phoneblur.com/api"
const webhook = "http://ec2-13-58-73-40.us-east-2.compute.amazonaws.com";

export const getBalance = async(res, req) => {
    try {
        // const res = await User.findById(req.params.id);
        const result = await axios.get(`${base_url}/account/balance`, {
            headers: {
                "Authorization": `Bearer ${req.token}`,
                'Content-Type': 'text/plain'
            }
        });
        console.log(result.data)
        // res.status(200).json(result.data);
    }catch(err) {
        console.log(err)
        // res.status(500).json(err);
    }
}

export const getNotifications = async(req, res) => {
    try {
        const result = await axios.get(`${webhook}/phoneblur/rentals/sms`,{
            headers: {
                "Authorization": `Bearer ${req.token}`
            }
        })
        console.log(result);
    }catch(err){
        console.log(err);
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

export const increaseBalance = async(req, res) => {
    if(req.params.id !== req.user.id) return res.status(403).json("Not authorized");
    try {
        const result = await User.findByIdAndUpdate(req.params.id, {
            $inc: { balance: req.body.balance}
        }, 
        {new: true}
        );
        const {password, ...others} = result._doc;
        console.log(others);
        res.status(200).json(result);
    }catch(err) {
        res.status(500).json(err);
    }
}

export const decreaseBalance = async(req, res) => {
    if(req.params.id !== req.user.id) return res.status(403).json("Not allowed!");
    try {
        const result = await User.findByIdAndUpdate(req.params.id, {
            $inc: { balance: -req.body.balance },
        },
        { new: true }
        );
        const {password, ...others} = result._doc;
        console.log(others)
        console.log(result)
        res.status(200).json(result);
    }catch(err) {
        res.status(500).json(err);
    }
}