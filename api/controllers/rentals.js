import Subscription from "../models/Subscription.js";
import Target from "../models/Target.js";

export const getTemperalTargets = async(req, res) => {
    try {
        const { instantAvailability } = req.query;
        // const filter = {
        //   isAvailableForTemporaryRentals: true,
        //   minimumRentalDuration: { $gte: 7 }, // Minimum rental duration of at least one week (7 days)
        // };
    
        // if (instantAvailability === 'true') {
        //   filter.hasInstantAvailability = true;
        // }
    
        // Assuming you have a Target model, find all targets that meet the criteria
        const availableTargets = await Target.find({duration: { $gte: 7 }, instantAvailability});
        if(!availableTargets) return res.status(404).json("No target availability found")
    
        return res.status(200).json(availableTargets);
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

export const getTemperalTargetsByLength = async(req, res) => {
    try {
        const { duration, instantAvailability } = req.query;
        
        // Validate and parse the duration query parameter
        const validDurations = ['1:00:00:00', '3:00:00:00', '7:00:00:00', '14:00:00:00'];
        
        if (!validDurations.includes(duration)) {
          return res.status(400).json({ error: 'Invalid duration specified.' });
        }
    
        // Define the filter criteria based on the query parameters
        // const filterCriteria = {
        //   minimumTargetDuration: duration, // Use the provided duration
        // };
    
        // if (instantAvailability === 'true') {
        //   filterCriteria.isInstantlyAvailable = true;
        // }
    
        // Assuming you have a Target model, find all targets that meet the criteria
        const availableTargets = await Target.find({duration, instantAvailability});
    
        return res.status(200).json(availableTargets);
      } catch (error) {
        console.error('Error fetching available targets:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

//  GET ALL TargetS AVAILABLE FOR SPECIFIED WEEKS
export const allTargetsForSpicifiedWeeks = async(req,res) => {
    try {
        const { weeks } = req.params;
        const { instantAvailability } = req.query;
        
        // Validate the 'weeks' parameter
        if (!['1', '2'].includes(weeks)) {
          return res.status(400).json({ error: 'Invalid value for weeks parameter. Must be 1 or 2.' });
        }
    
        // Define the filter criteria based on the 'weeks' parameter and query parameter
        // const filterCriteria = {
        //   TargetLength: `${weeks} week${weeks === '1' ? '' : 's'}`, // "1 week" or "2 weeks"
        // };
    
        // if (instantAvailability === 'true') {
        //   filterCriteria.isInstantlyAvailable = true;
        // }
    
        // Assuming you have a Target model, find all targets that meet the criteria
        const availableTargets = await Target.find({duration: weeks, instantAvailability});
    
        return res.status(200).json(availableTargets);
      } catch (error) {
        console.error('Error fetching available targets:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

// GET ALL TargetS AVAILABLE FOR PARMENT SUBSCRIPTION
export const availableTargetForParmentSub = async(req ,res) => {
    try {
        const { instantAvailability } = req.query;
        
        // // Define the filter criteria based on the query parameter
        // const filterCriteria = {
        //   isAvailableForPermanentSubscriptions: true,
        // };
    
        // if (instantAvailability === 'true') {
        //   filterCriteria.isInstantlyAvailable = true;
        // }
    
        // Assuming you have a Target model, find all targets that meet the criteria
        const availableTargets = await Target.find({instantAvailability, isAvailableForPermanentSub: true});
    
        return res.status(200).json(availableTargets);
      } catch (error) {
        console.error('Error fetching available targets:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

// GET ALL TEMPERAL RENTALS
export const allTemperalRentals = async(req, res) => {
  try {
    // Assuming you have a Subscription model, find all temporary rental subscriptions
    const temporarySubscriptions = await Subscription.find({subscriberId: req.user._id});
    if(!temporarySubscriptions) return res.status(404).json("No subscription found");

    return res.status(200).json(temporarySubscriptions);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}