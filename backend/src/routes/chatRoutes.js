import express from 'express';

// Action 	Method	Endpoint	        Description
// Create	POST	/api/intents	    Inserts record (including nested response subdocs)
// Read All	GET	    /api/intents	    Fetch all; can filter via /api/intents?domain=payments
// Read One	GET	    /api/intents/:id	Fetch by the custom string _id
// Update	PUT	    /api/intents/:id	Updates fields and increments version
// Delete	DELETE	/api/intents/:id	Removes the document from the collection


import {
    getMatchingResponse
} from '../controllers/chatController.js';

const chatRouter = express.Router();

// chatRouter.post("/message", getResponse)
chatRouter.post("/message", getMatchingResponse)
// intentRouter.get("/getIntentById/:id", getIntentById)
// intentRouter.post("/addIntent", createIntent)
// intentRouter.put("/updateIntent/:id", updateIntent)
// intentRouter.delete("/delete/:id", deleteIntent)


export default chatRouter;


