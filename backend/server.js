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

// Cors middleware 
const corsOptions = {
    origin: [process.env.ORIGIN_URL, 'http://localhost:5174'] // Specify the exact origin
};
app.use(cors(corsOptions))

// Mount the routes
app.use('/api/intents', intentRouter);
app.use('/api/chat', chatRouter);
app.use("/api/admin", adminRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
