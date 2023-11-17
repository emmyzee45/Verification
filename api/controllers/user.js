import User from "../models/User.js";
import Token from "../models/Token.js";
import axios from "axios";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { hashToken } from "../midlewares/verify.js";
import sendEmail from "../utils/sendEmail.js";

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
        res.status(200).json(result);
    }catch(err) {
        res.status(500).json(err);
    }
}

// Forgot Password
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json("No user with this email");
  }

  // Delete Token if it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  //   Create Verification Token and Save
  const resetToken = crypto.randomBytes(32).toString("hex") + user._id;

  // Hash token and save
  const hashedToken = hashToken(resetToken);
  await new Token({
    userId: user._id,
    rToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000), // 60mins
  }).save();

  // Construct Reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  // Send Email
  const subject = "Password Reset Request - AUTH:Z";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = "noreply@simver.net";
  const template = "forgotPassword";
  const name = user.name;
  const link = resetUrl;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: "Password Reset Email Sent" });
  } catch (error) {
    res.status(500).json("Email not sent, please try again");
  }
  };

  // Reset Password
export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    const hashedToken = hashToken(token);
  
    const userToken = await Token.findOne({
      rToken: hashedToken,
      expiresAt: { $gt: Date.now() },
    });
  
    if (!userToken) {
      return res.status(404).json("Invalid or Expired Token");
    }
  
    // Find User
    const user = await User.findOne({ _id: userToken.userId });
    const hash = bcrypt.hashSync(password, 5);

    // Now Reset password
    user.password = hash;
    await user.save();
  
    res.status(200).json({ message: "Password Reset Successful, please login" });
  };
  