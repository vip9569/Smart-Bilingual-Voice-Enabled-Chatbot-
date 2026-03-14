import mongoose from "mongoose";

const intentPhraseSchema = new mongoose.Schema(
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

        phrase: {
            type: String,
            required: true
        },

        embedding: {
            type: [Number],
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("IntentPhrase", intentPhraseSchema);