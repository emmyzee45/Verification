import Reservation from "../models/Reservation.js";
import Subscription from "../models/Subscription.js";
import Text from "../models/Text.js";

// GET ALL SUBSCRIPTIONS
export const getAllSubcriptions = async(req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json(subscriptions);
    }catch(err) {
        res.status(400).json(err);
    }
}

// GET SINGLE SUBSCRIPTION
export const getSubcription = async(req, res) => {
    try {
        const subscriptions = await Subscription.findById(req.params.subscriptionId);
        res.status(200).json(subscriptions);
    }catch(err) {
        res.status(400).json(err);
    }
}
// GENERATE INVOICE
export const generateInvoice = async(req, res) => {
    try {
  const subscription = Subscription.findById(subscriptionId);

  if (!subscription) {
    return res.status(404).json({ error: 'Subscription not found' });
  }

  if (subscription.allowCustomerInitiatedRenewal) {
    return res.status(200).json({ message: 'Subscription has already been renewed for this cycle.' });
  }
  // Calculate the renewal cost for this cycle (replace with your logic)
  const renewalCost = calculateRenewalCost(subscription);

  return res.status(200).json({ renewalCost });
    }catch(err) {
        res.status(400).json(err);
    }
}

// GET RENEWAL COST
export const getRenewalCost = async(req,  res) => {

} 

// SUMMIT RENEWAL COST
export const submitNewalCost = async(req,res) => {
    const subscription = await Subscription.findById(req.params.subscriptionId);
    if(!subscription) return res.status(404).json("Invalid subscription Id");

    try {
        const updateItems = await Subscription.findByIdAndUpdate(req.params.subscriptionId,)
    }catch(err) {
        res.status(400).json(err);
    }
}

// ENABLE REMINDERS
export const enableReminders = async(req,  res) => {
    const subscription = await Subscription.findById(req.params.subscriptionId);
    if(!subscription) return res.status(404).json("Invalid subscription Id");

    try {
        const updateRemdinders = await Subscription.findByIdAndUpdate(req.params.subscriptionId, {
            $set: { isEmailReminderEnabled: true}
        }, {new: true});
        res.status(200).json(updateRemdinders)
    }catch(err) {
        res.status(400).json(err);
    }
}

// DISABLE REMINDERS
export const disableReminders = async(req,  res) => {
    if(!req.params.subscriptionId) return res.status(400).json("Invalid or No subscription Id");

    const subscription = await Subscription.findById(req.params.subscriptionId);
    if(!subscription) return res.status(404).json("Invalid subscription Id");

    try {
        const updateRemdinders = await Subscription.findByIdAndUpdate(req.params.subscriptionId, {
            $set: { isEmailReminderEnabled: false}
        }, {new: true});
        res.status(200).json(updateRemdinders)
    }catch(err) {
        res.status(500).json(err);
    }
}

// GET ALL LATEST INCOMING TEXTS
export const getLatestText =  async(req, res) => {
    const { skip, limit } = req.query;

    // Validate the skip and limit parameters
    const skipCount = parseInt(skip, 10);
    const limitCount = parseInt(limit, 10);
  
    if (isNaN(skipCount) || isNaN(limitCount) || limitCount < 5 || limitCount > 10) {
      return res.status(400).json({ error: 'Invalid skip or limit parameters.' });
    }
  
    try {
      // Query MongoDB to get the latest incoming text messages
      const latestTextMessages = await Text.find()
        .sort({ creetedAt: -1 }) // Sort by timestamp in descending order (latest first)
        .skip(skipCount)
        .limit(limitCount);
  
      return res.status(200).json(latestTextMessages);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

}

// GET TEXT BY SUBSCRIPTION
export const getTextBySubscription = async(req, res) => {
    const { subscriptionId } = req.params;
  const { skip, limit } = req.query;

  // Validate the skip and limit parameters
  const skipCount = parseInt(skip, 10);
  const limitCount = parseInt(limit, 10);

  if (isNaN(skipCount) || isNaN(limitCount) || limitCount < 5 || limitCount > 10) {
    return res.status(400).json({ error: 'Invalid skip or limit parameters.' });
  }

  try {
    // Query MongoDB to get the latest texts for the specified subscription
    const latestTextMessages = await Text.find({ subscriptionId })
      .sort({ createdAt: -1 }) 
      .skip(skipCount)
      .limit(limitCount);

    return res.status(200).json(latestTextMessages);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// GET ALL TARGETED RESERVATION
export const allTargetedReservation = async(req, res) => {
    const { subscriptionId } = req.params;

    try {
      // Query MongoDB to get all targeted reservations for the specified subscription
      const targetedReservations = await Reservation.find({ subscriptionId });
  
      if (targetedReservations.length === 0) {
        return res.status(404).json({ error: 'No targeted reservations found for this subscription.' });
      }
  
      return res.status(200).json(targetedReservations);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// GET SINGLE TARGETED RESERVATION
export const targetedReservation = async(req, res) => {
    const { subscriptionId, reservationId } = req.params;

    try {
      // Query MongoDB to find the targeted reservation within the specified subscription
      const targetedReservation = await Reservation.findOne({ subscriptionId, _id: reservationId });
  
      if (!targetedReservation) {
        return res.status(404).json({ error: 'Targeted reservation not found.' });
      }
  
      return res.status(200).json(targetedReservation);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Exclude reservation from renewal
export const disableReservation = async(req, res) => {
    const { subscriptionId, reservationId } = req.params;

  try {
    // Find the targeted reservation within the specified subscription
    const targetedReservation = await Reservation.findOne({ subscriptionId, _id: reservationId });

    if (!targetedReservation) {
      return res.status(404).json({ error: 'Targeted reservation not found.' });
    }

    // Update the reservation to mark it as excluded from renewal
    targetedReservation.includeForRenewal = false; // Set to true to exclude from renewal

    // Save the updated reservation
    await targetedReservation.save();

    return res.status(200).json({ message: 'Reservation excluded from renewal successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// REFUND RESERVATION
export const refundReservation = async(req, res) => {
    const { subscriptionId, reservationId } = req.params;

  try {
    // Find the targeted reservation within the specified subscription
    const targetedReservation = await Reservation.findOne({ subscriptionId, _id: reservationId });

    if (!targetedReservation) {
      return res.status(404).json({ error: 'Targeted reservation not found.' });
    }

    // Check if the reservation can be refunded
    if (!canRefundReservation(targetedReservation)) {
      return res.status(400).json({ error: 'Reservation cannot be refunded.' });
    }

    // Perform the refund action (you can define the refund logic here)
    const refundResult = await processRefund(targetedReservation);

    // Handle the refund result (you can customize this based on your requirements)
    if (refundResult.success) {
      return res.status(200).json({ message: 'Reservation refunded successfully.' });
    } else {
      return res.status(400).json({ error: 'Failed to refund reservation.' });
    }
  } catch (error) {
    console.error('Error refunding reservation:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
    // Helper function to check if a reservation can be refunded
    function canRefundReservation(reservation) {
        // Implement refund eligibility logic here
        // Check if it satisfies constraints like not being a Google voice reservation, access granted within the last hour, etc.
        // Return true if it can be refunded, false otherwise
        // Example: return !reservation.isGoogleVoice && isAccessGrantedWithinLastHour(reservation);
    }
    
    // Helper function to perform the refund action
    async function processRefund(reservation) {
        // Implement refund logic here
        // You can update the reservation status or perform any necessary actions
        // Return an object with success and error information
        // Example: return { success: true, error: null };
    }
}

// WAKE UP A SPECIFIC RESERVATION TO RECEIVE MESSAGES
export const wakeupReservation = async(req, res) => {
    const { subscriptionId, reservationId } = req.params;

  try {
    // Find the targeted reservation within the specified subscription
    const targetedReservation = await Reservation.findOne({ subscriptionId, _id: reservationId });

    if (!targetedReservation) {
      return res.status(404).json({ error: 'Targeted reservation not found.' });
    }

    // Check if the reservation is already awake
    if (targetedReservation.isAwake) {
      return res.status(200).json({ message: 'Reservation is already awake.' });
    }

    // Perform the wake-up action and calculate the estimated delay
    const estimatedDelayInSeconds = await wakeUpReservation(targetedReservation);

    return res.status(200).json({ message: 'Reservation is waking up.', estimatedDelayInSeconds });
  } catch (error) {
    console.error('Error waking up reservation:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  // Helper function to wake up the reservation
async function wakeUpReservation(reservation) {
    const { lineNumber, isAwake, secondsAvailable } = reservation;
  
    if (!isAwake || secondsAvailable <= 0) {
      // If the line is not awake or secondsAvailable is zero or negative,
      // perform the wake-up action and calculate the estimated delay
      // For simplicity, we'll simulate a delay of 10 seconds (you can adjust this as needed)
      const estimatedDelayInSeconds = 10;
  
      // Update the reservation to mark it as awake and reset the secondsAvailable
      reservation.isAwake = true;
      reservation.secondsAvailable = estimatedDelayInSeconds;
  
      // Save the updated reservation (you may want to use await here)
      await reservation.save();
  
      return estimatedDelayInSeconds;
    } else {
      // If the line is already awake and has secondsAvailable, no need to wake it up again
      return secondsAvailable;
    }
  }
  
}

// GET WAKE UP STATUS

export const getWakeStatus = async(req, res) => {
    const { subscriptionId, reservationId } = req.params;

  try {
    // Find the targeted reservation within the specified subscription
    const targetedReservation = await Reservation.findOne({ subscriptionId, _id: reservationId });

    if (!targetedReservation) {
      return res.status(404).json({ error: 'Targeted reservation not found.' });
    }

    // Get the wake-up status information
    const wakeUpStatus = getWakeUpStatus(targetedReservation);

    return res.status(200).json(wakeUpStatus);
  } catch (error) {
    console.error('Error fetching wake-up status:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  function getWakeUpStatus(reservation) {
    // Check if the reservation is active and has secondsAvailable
    if (reservation.isAwake && reservation.secondsAvailable > 0) {
      return {
        active: true,
        secondsAvailable: reservation.secondsAvailable,
        secondsUntilAvailable: reservation.secondsUntilAvailable,
      };
    } else {
      return {
        active: false,
        secondsAvailable: null,
        secondsUntilAvailable: null,
      };
    }
  }
}

// ADD SINGLE SERVICE
export const addSingleService = async(req ,res) => {
    const { SubscriptionId, InstantAvailability, Targets } = req.body;

  try {
    // Create or find the subscription based on the provided SubscriptionId
    let subscription;

    if (SubscriptionId) {
      subscription = await Subscription.findOne({ _id: SubscriptionId });

      if (!subscription) {
        return res.status(404).json({ error: 'Subscription not found.' });
      }
    } else {
      // Create a new subscription if SubscriptionId is not provided
      subscription = new Subscription();
      await subscription.save();
    }

    // Add the new service lines to the subscription
    const addedServiceLines = await addServiceLinesToSubscription(subscription, Targets, InstantAvailability);

    return res.status(200).json({ message: 'Service lines added successfully.', addedServiceLines });
  } catch (error) {
    console.error('Error adding service lines:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  async function addServiceLinesToSubscription(subscription, targets, instantAvailability) {
    // Implement your logic here to add service lines to the subscription
    // You can create new service line documents and associate them with the subscription
    // Set the instantAvailability flag based on the provided value
  
    // Example: Creating service line documents and associating them with the subscription
    const addedServiceLines = [];
  
    for (const targetId of targets) {
      const serviceLine = {
        subscriptionId: subscription._id,
        targetId,
        instantAvailability,
      };
  
    //   await serviceLine.save();
      addedServiceLines.push(serviceLine);
    subscription.targetedReservations.push(serviceLine);
    }
    await subscription.save()
    return addedServiceLines;
  }
}

// ADD MULT-PURPOSE SERVICE
export const addMultiPurposeService = async(req, res) => {
    const { DiscountCode, SubscriptionId, AreaCode, InstantAvailability } = req.body;

    try {
      // Create or find the subscription based on the provided SubscriptionId
      let subscription;
  
      if (SubscriptionId) {
        subscription = await Subscription.findOne({ _id: SubscriptionId });
  
        if (!subscription) {
          return res.status(404).json({ error: 'Subscription not found.' });
        }
      } else {
        // Create a new subscription if SubscriptionId is not provided
        subscription = new Subscription();
        // Add any other required fields to the subscription
        // subscription.name = 'Your Subscription Name';
        // subscription.description = 'Your Subscription Description';
        await subscription.save();
      }
  
      // Add the new multi-purpose line to the subscription
      const addedMultiPurposeLine = await addMultiPurposeLineToSubscription(subscription, DiscountCode, AreaCode, InstantAvailability);
  
      return res.status(200).json({ message: 'Multi-purpose line added successfully.', addedMultiPurposeLine });
    } catch (error) {
      console.error('Error adding multi-purpose line:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Helper function to add a multi-purpose line to a subscription
async function addMultiPurposeLineToSubscription(subscription, discountCode, areaCode, instantAvailability) {
    // Implement your logic here to add a multi-purpose line to the subscription
    // You can create a new multi-purpose line document and associate it with the subscription
    // Set the discount code, area code, and instantAvailability flag based on the provided values
  
    // Example: Creating a multi-purpose line document and associating it with the subscription
    const multiPurposeLine = new MultiPurposeLine({
      subscriptionId: subscription._id,
      discountCode,
      areaCode,
      instantAvailability,
    });
  
    await multiPurposeLine.save();
    return multiPurposeLine;
  }

// PRIMARY SUBSCRIPTION
export const primarySubscription = async(req, res) => {
  const { subscriptionId } = req.params;

  try {
    // Find the subscription based on the provided subscriptionId
    const subscription = await Subscription.findOne({ _id: subscriptionId });

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found.' });
    }

    // Update the user's primary subscription in the database
    subscription.isPrimarySubscription = true;
    await subscription.save();

    return res.status(200).json({ message: 'Primary subscription set successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// CREATE SUBSCRIPTION
export const createSubscription = async(req, res) => {
    const newSub = new Subscription(req.body);
    try {
        const saveSub = await newSub.save();
        res.status(200).json(saveSub);
    }catch(err) {
        res.status(400).json(err);
    }
}
