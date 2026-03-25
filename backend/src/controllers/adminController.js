import UnAnsweredQueries from "../models/unAnsweredQueries.js"
import Message from "../models/messageHistory.js";

// fetch List of all un answered queries
export const getAllUnansweredQueries = async (req, res) => {
    try {

        const allUnansweredQueries = await UnAnsweredQueries.find()

        if (!allUnansweredQueries) {
            return res.status(404).json({ mesaage: "Queries Not Exists" })
        }
        return res.status(200).json(allUnansweredQueries)
    } catch (error) {
        return res.status(500).json({ message: `queries message error ${error.message}` })
    }
}

export const deleteQuery = async (req, res) => {
    try {
        const queryId = req.params.id

        // console.log(queryId)
        if (!queryId) {
            return res.status(400).json({ message: "Bad Request" })
        }
        const query = await UnAnsweredQueries.findByIdAndDelete(queryId)

        if (!query) {
            return res.status(404).json({ message: "Query Not Found" })
        }

        return res.status(200).json({ message: "Query Deleted Successfully" })
    } catch (error) {
        return res.status(500).json({ message: `Server Error ${error.message}` })
    }
}

// Chat History controller 
export const getChatHistory = async (req, res) => {
    try {

        const messages = await Message.find().sort({ createdAt: 1 });

        const userChats = {};

        messages.forEach((msg) => {

            const date = msg.createdAt.toISOString().split("T")[0];
            const time = msg.createdAt.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });

            if (!userChats[msg.userId]) {
                userChats[msg.userId] = {
                    id: msg.userId,
                    name: msg.userId,
                    lastMessage: msg.botResponse,
                    lastActive: msg.createdAt,
                    totalMessages: 0,
                    chats: {}
                };
            }

            if (!userChats[msg.userId].chats[date]) {
                userChats[msg.userId].chats[date] = [];
            }

            // Push user message
            userChats[msg.userId].chats[date].push({
                sender: "user",
                text: msg.userMessage,
                time
            });

            // Push bot response
            userChats[msg.userId].chats[date].push({
                sender: "bot",
                text: msg.botResponse,
                time
            });

            userChats[msg.userId].totalMessages += 2;

        });

        const formattedData = Object.values(userChats).map(chat => ({
            ...chat,
            chats: Object.keys(chat.chats).map(date => ({
                date,
                messages: chat.chats[date]
            }))
        }));

        res.status(200).json(formattedData);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error fetching chat history"
        });

    }
};