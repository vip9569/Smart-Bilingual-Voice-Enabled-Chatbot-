import express from 'express';

// Action 	Method	Endpoint	        Description
// Create	POST	/api/intents	    Inserts record (including nested response subdocs)
// Read All	GET	    /api/intents	    Fetch all; can filter via /api/intents?domain=payments
// Read One	GET	    /api/intents/:id	Fetch by the custom string _id
// Update	PUT	    /api/intents/:id	Updates fields and increments version
// Delete	DELETE	/api/intents/:id	Removes the document from the collection


import {
    createIntent,
    getIntentById,
    getAllIntents,
    updateIntent,
    deleteIntent
} from '../controllers/intentsController.js';

const intentRouter = express.Router();

intentRouter.get("/get-intents", getAllIntents)
intentRouter.get("/getIntentById/:id", getIntentById)
intentRouter.post("/add-intents", createIntent)
intentRouter.put("/update-intent/:id", updateIntent)
intentRouter.delete("/delete/:id", deleteIntent)


export default intentRouter;


