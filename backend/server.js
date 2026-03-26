import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './src/config/db.js';
import intentRouter from './src/routes/intentRoutes.js';
import chatRouter from './src/routes/chatRoutes.js';
import adminRouter from './src/routes/adminChatRoutes.js';
dotenv.config();

connectDB()

const app = express();

// Middleware to parse JSON bodies (Required for subdocuments to work!)
app.use(express.json());



// Allowed origins (frontend URLs)
const allowedOrigins = [
    process.env.ORIGIN_URL,
    "https://smart-bilingual-voice-enabled-chatbot-1.onrender.com",
    "http://localhost:5174",
];

// CORS Middleware
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like Postman, mobile apps)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log("Blocked by CORS:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

// Mount the routes
app.use('/api/intents', intentRouter);
app.use('/api/chat', chatRouter);
app.use("/api/admin", adminRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
