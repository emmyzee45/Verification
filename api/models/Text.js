import mongoose from "mongoose";

const TextSchema = new mongoose.Schema({
    lineNumber: {
        type: String,
        required: false,
    },
    lineType: {
        type: String,
        required: false,
    },
    subscriptionItemId: {
        type: String,
        required: false,
    },
    subscriptionId: {
        type: String,
        required: false,
    },
    payloadDisplayValue: {
        type: String,
        required: false,
    },
    fullPayloadValue: {
        type: String,
        required: false,
    },
    isAssignedToSubscriptionItem: {
        type: Boolean,
        default: false,
    },
    parsedCode: {
        type:String,
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
    sentAt: {
        type: Date,
        default: Date.now(),
    },
    sentFrom: {
        type: String,
        required: false,
    },
    totalRecords: {
        type: Number,
        default: 0,
    },
    unfilteredSmsSendingAddOnId: {
        type: String,
        required: false,
    },
    hasUnfilteredSmsSendingAddOn: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

export default mongoose.model("Text", TextSchema);