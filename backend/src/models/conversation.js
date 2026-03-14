import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },

        sessionId: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["active", "closed"],
            default: "active"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Conversation", conversationSchema);