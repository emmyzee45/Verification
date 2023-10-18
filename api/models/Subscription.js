import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
    targetedReservations: {
        type: Array,
        default: null,
    },
    wholeLineReservations: {
        type: Array,
        default: null,
    },
    strReservations: {
        type: Array,
        default: null,
    },
    provisioningRequests: {
        type: Array,
        default: null,
    },
    allowCustomerInitiatedRenewal: {
        type: Boolean,
        default: false,
    },
    cycleStarted: {
        type: String,
        required: false,
    },
    cycleEnd: {
        type: String,
        required: false
    },
    cycleLength: {
        type: {
            ticks: {
                type: Number,
            },
            days: {
                type: Number,
            },
            hours: {
                type: Number,
            },
            milliseconds: {
                type: Number,
            },
            microseconds: {
                type: Number,
            },
            nanoseconds: {
                type: Number,
            },
            minutes: {
                type: Number,
            },
            seconds: {
                type: Number,
            },
            totalDays: {
                type: Number,
            },
            totalHours: {
                type: Number,
            },
            totalMilliseconds: {
                type: Number,
            },
            totalMicroseconds: {
                type: Number,
            },
            totalMinutes: {
                type: Number,
            },
            totalSeconds: {
                type: Number,
            },
        },
    },
    scheduledCycleRenewal: {
        type: String,
        required: false
    },
    projectedEnd: {
        type: String,
        required: false
    },
    lastRenewedAt: {
        type: String,
        required: false
    },
    isEmailReminderEnabled: {
        type: Boolean,
        default: false,
    },
    isAutoRenewalEnabled: {
        type: Boolean,
        default: false,
    },
    isExpired: {
        type: Boolean,
        default: false,
    },
    isHidden: {
        type: Boolean,
        default: false,
    },
    isGracePeriod: {
        type: Boolean,
        default: false,
    },
    nickname: {
        type: String,
        required: false,
    },
    subscriptionNumber: {
        type: Number,
        default: 0,
    },
    isPrimarySubscription: {
        type: Boolean,
        default: false,
    },
    subscriberId: {
        type: String,
        required: false
    },
    isPermanent: {
        type: Boolean,
        default: false,
    },
    isTemperal: {
        type: Boolean,
        default: false,
    },
    isMulti: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        default: 0,
    },
    name: {
        type: String,
        required: true,
    }
    
}, {timestamps: true});

export default mongoose.model("Subscription", SubscriptionSchema);