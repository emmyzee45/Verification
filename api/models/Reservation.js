import mongoose from "mongoose";

const TextSchema = new mongoose.Schema({
    lineNumber: {
        type: String,
        required: false,
    },
    subscriptionId: {
        type: String,
        required: false,
    },
    target: {
        type: {
            name: {
                type: String,
                required: false
            },
            searchKeywords: {
                type: String,
                required: false
            },
            description: {
                type: String,
                required: false
            },
            iconUri: {
                type: String,
                required: false
            }, 
            targetId: {
                type: Number,
                default: null
            }, 
            sliceId: {
                type: Number,
                default: null
            }, 
        },
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    isMatchingDisabled: {
        type: Boolean,
        default: false
    },
    includeWithRenewal: {
        type: Boolean,
        default: false
    },
    includeForRenewal: {
        type: Boolean,
        default: false
    },
    hideFromUserView: {
        type: Boolean,
        default: false
    },
    alwaysOn: {
        type: Boolean,
        default: false
    },
    prepaidCycles: {
        type: Number,
        default: 0
    },
    userNotes: {
        type: String,
        required: false
    },
    accessGranted: {
        type: String,
        required: false
    },
    accessLost: {
        type: String,
        required: false
    },
    renewedThrough: {
        type: String,
        required: false
    },
    renewalPrice: {
        type: {
            amount: {
                type: Number,
                default: 0
            },
            currency: {
                type: {
                    code: {
                        type: String,
                    },
                    name: {
                        type: String,
                    },
                    abbreviation: {
                        type: String,
                    },
                    symbol: {
                        type: String,
                    },
                    stringFormat: {
                        type: String,
                    },
                }
            }
        }
    },
    isRefundableForCustomer: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

export default mongoose.model("Reservation", TextSchema);