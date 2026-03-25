import mongoose from "mongoose";

const intentSchema = new mongoose.Schema(
    {
        intentName: {       // intentName : "Payment"
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        description: {      // description : "Payment related intent"
            type: String,
            default: ""
        },

        currentVersion: {
            type: Number,
            required: false,
            default: 1
        },

        status: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Intent", intentSchema);