import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import  base64 from 'base-64';
import { generateToken } from "../midlewares/verify.js";

export const register = async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    res.status(500).json(err);
  }
};
// function to login
export const login = async (req, res) => {
    // const encodedAuthHeader = base64.encode(authHeader)
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return res.status(404).json("User not found!");

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return res.status(400).json("Wrong password or username!");

    const token = generateToken(user)

    // const { password, ...info } = user._doc;
      
    res.header("authorization", token).status(200).json(token);
  } catch (err) {
    res.status(500).json(err);
  }
};
// Function to refresh the bearer token
export const refreshBearerToken = (req, res) => {
    try {
    
    console.log(req.user)
    const token = generateToken(req.headers.token.split(" ")[1]);
  
      res.header("authorization", token).status(200).json(token);
    } catch (error) {
      console.error('Error refreshing token:', error);
      return res.status(500).json({ error: 'Error refreshing token' });
    }
  }