import axios from "axios";
import User from "../models/User.js";
import Text from "../models/Text.js";
import sendEmail from "../utils/sendEmail.js";
const base_url = "https://www.phoneblur.com/api"

export const getTemperalTargetsByLength = async(req, res) => {

  try {
        const { duration, instantAvailability } = req.query;

        // Validate and parse the duration query parameter
        const validDurations = ['1:00:00:00', '3:00:00:00', '7:00:00:00', '14:00:00:00'];
        
        if (!validDurations.includes(duration)) {
          return res.status(400).json({ error: 'Invalid duration specified.' });
        }


        const result = await axios.get(`${base_url}/temporary-rentals/reservations/catalog/duration?duration=${duration}:00:00:00&instantAvailability=${instantAvailability}`, {
          headers: {
              "Authorization": `Bearer ${req.token}`,
          }
      });
      // console.log(result.data)
        return res.status(200).json(result.data);
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

// GET ALL TargetS AVAILABLE FOR PARMENT SUBSCRIPTION
export const availableTargetForParmentSub = async(req ,res) => {

  try {
      const { instantAvailability } = req.query;
      if(!instantAvailability) return res.status(400).json("Invalid request");

      const result = await axios.get(`${base_url}/reservations/catalog?instantAvailability=${instantAvailability}`, {
        headers: {
            "Authorization": `Bearer ${req.token}`,
        }
    });
    // console.log(result.data)
      return res.status(200).json(result.data);
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

// Create Temperary Rental SUBSCRIPTION
export const CreateTemperaryRental = async(req ,res) => {
    try {
      const { targets, duration, balance } = req.body;
      if(!targets || !duration ) return res.status(400).json("targets or duration missing");

      const result = await axios.post(`${base_url}/temporary-rentals`, req.body, {
        headers: {
            "Authorization": `Bearer ${req.token}`,
        }
    });
    const updateUser = await User.findByIdAndUpdate(req.user.id, 
      { 
        $push: { subscriptionIds: result.data.id }, 
        $inc: { balance: -balance }}, 
        {new: true}
      );
    return res.status(200).json({line: result.data, user: updateUser});
    } catch (error) {
      console.error('Error fetching available targets:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
}


// GET ALL TEMPERAL RENTALS
export const allTemperalRentals = async(req, res) => {
  try {
    const { subscriptionId } = req.params;

    const result = await axios.get(`${base_url}/temporary-rentals`, {
      headers: {
          "Authorization": `Bearer ${req.token}`,
      }
  });
  
    return res.status(200).json(result.data);
    } catch (error) {
      console.error('Error fetching available targets:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// GET DETAILS ABOUT A TEMPERAL RENTAL
export const getDetailsTemperalRental = async(req, res) => {
  try {
    const { subscriptionId } = req.params;

    const result = await axios.get(`${base_url}/temporary-rentals/${subscriptionId}/reservations`, {
      headers: {
          "Authorization": `Bearer ${req.token}`,
      }
  });
  
    return res.status(200).json(result.data);
    } catch (error) {
      console.error('Error fetching available targets:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// CREATE SINGLE LINE SUBSCRIPTION
export const createSingleLineSub = async(req, res) => {
  try {
    const { targets } = req.body;
    if(!targets) return res.status(400).json("targets or duration missing");

    const result = await axios.post(`${base_url}/single-service`, req.body, {
      headers: {
          "Authorization": `Bearer ${req.token}`,
      }
  });

  await User.findByIdAndUpdate(req.user.id, { $push: { subscriptionIds: result.data.id }});
  
  const subscriptionUrl = `${process.env.FRONTEND_URL}/subscriptions`;
   // Send Email
  const subject = "Subscription - SUPPORT:Z";
  const send_to = req.user.email;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = "noreply@simver.net";
  const template = "buy";
  const name = req.user.name;
  const link = subscriptionUrl;

  await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );

  return res.status(200).json(result.data);
  } catch (error) {
    console.error('Error fetching available targets:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// CREATE Multi LINE SUBSCRIPTION
export const createMultiLineSub = async(req, res) => {
  console.log(req.user.id)
  try {

    const result = await axios.post(`${base_url}/multi-purpose-line`, req.body, {
      headers: {
          "Authorization": `Bearer ${req.token}`,
      }
  });
  console.log(result.data)
  await User.findByIdAndUpdate(req.user.id, { $push: { subscriptionIds: result.data.id }});

  return res.status(200).json("Successful");
  } catch (error) {
    console.error('Error fetching available targets:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const getLatestText = async(req, res) => {
  const { subscriptionId } = req.params;
  
  try {
    const result = await axios.get(`${base_url}/incoming-text-messages`, {
      headers: {
          "Authorization": `Bearer ${req.token}`,
      }
  });
  return res.status(200).json(result.data);
  } catch (error) {
    console.error('Error fetching available targets:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const getAllSubscriptions = async(req, res) => {  
  try {
    const result = await axios.get(`${base_url}/subscriptions`, {
      headers: {
          "Authorization": `Bearer ${req.token}`,
      }
  });
  return res.status(200).json(result.data);
  } catch (error) {
    console.error('Error fetching available targets:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const wakeupLine = async(req, res) => {  
  const { subscriptionId } = req.query;
  const text = await Text.find({subscriptionId})
  
  try {
    const result = await axios.post(`${base_url}/subscriptions/${text.subscriptionId}/reservations/${text.reservationId}/wake`, {
      headers: {
          "Authorization": `Bearer ${req.token}`,
      }
  });
  return res.status(200).json(result.data);
  } catch (error) {
    console.error('Error fetching available targets:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const submitRenewal = async(req, res) => {  
  const { subscriptionId } = req.params
  try {
    const result = await axios.post(`${base_url}/subscriptions/${subscriptionId}/renew/submit`, {
      headers: {
          "Authorization": `Bearer ${req.token}`,
      }
  });
  return res.status(200).json(result.data);
  } catch (error) {
    console.error('Error fetching available targets:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
