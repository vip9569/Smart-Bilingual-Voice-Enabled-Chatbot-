import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true
        },

        userId: {
            type: String,
            required: true
        },

        userMessage: {
            type: String,
            required: true
        },

        botResponse: {
            type: String,
            required: true
        },

        detectedIntent: {
            type: String
        },

        intentVersion: {
            type: Number
        },

        similarityScore: {
            type: Number
        },

        source: {
            type: String,
            enum: ["vector_search", "keyword_search", "fallback"]
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Message", messageSchema);