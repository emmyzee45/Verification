import Subscription from "../models/Subscription.js";
import Target from "../models/Target.js";
import axios from "axios";
import User from "../models/User.js";
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
    
      return res.status(200).json(result.data);
      } catch (error) {
        console.error('Error fetching available targets:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

// Create Temperary Rental SUBSCRIPTION
export const CreateTemperaryRental = async(req ,res) => {
    try {
      const { targets, duration } = req.body;
      if(!targets || !duration ) return res.status(400).json("targets or duration missing");

      const result = await axios.post(`${base_url}/temporary-rentals`, req.body, {
        headers: {
            "Authorization": `Bearer ${req.token}`,
        }
    });
    console.log(result.data.id)
    console.log(req.user.id)
    await User.findByIdAndUpdate(req.user.id, { $push: { subscriptionIds: result.data.id }});

    return res.status(200).json(result.data);
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
  console.log(result.data.id)
  console.log(req.user.id)
  await User.findByIdAndUpdate(req.user.id, { $push: { subscriptionIds: result.data.id }});

  return res.status(200).json(result.data);
  } catch (error) {
    console.error('Error fetching available targets:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
export const getLatestText = async(req, res) => {
  const { subscriptionId } = req.params;
  
  try {
    const result = await axios.post(`${base_url}/subscriptions/${subscriptionId}/incoming-text-messages`, {
      headers: {
          "Authorization": `Bearer ${req.token}`,
      }
  });
  console.log(result.data)
  return res.status(200).json(result.data);
  } catch (error) {
    console.error('Error fetching available targets:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
