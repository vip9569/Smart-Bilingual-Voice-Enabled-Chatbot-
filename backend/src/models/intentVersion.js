import mongoose from "mongoose";

const intentVersionSchema = new mongoose.Schema(
    {
        intentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Intent",
            required: true
        },

        version: {
            type: Number,
            required: false
        },
        isActive: {
            type: Boolean,
            default: true
        },

        response: {
            en: {
                type: String,
                required: true
            },

            hi: {
                type: String,
                required: true
            }
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("IntentVersion", intentVersionSchema);