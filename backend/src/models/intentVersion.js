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

        response: {
            en: {
                type: String,
                rewuired: true
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