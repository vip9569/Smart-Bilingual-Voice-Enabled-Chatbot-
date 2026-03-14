import mongoose from "mongoose";

const unansweredQuerySchema = new mongoose.Schema(
    {
        userId: {
            type: String
        },

        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation"
        },

        query: {
            type: String,
            required: true
        },

        embedding: {
            type: [Number]
        },

        reason: {
            type: String,
            enum: [
                "low_similarity",
                "no_intent_found",
                "fallback_response"
            ],
            default: "no_intent_found"
        },

        suggestedIntent: {
            type: String
        },

        status: {
            type: String,
            enum: ["pending", "reviewed", "converted_to_intent"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("UnansweredQuery", unansweredQuerySchema);