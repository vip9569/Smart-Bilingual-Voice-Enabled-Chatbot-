import IntentPhrase from '../models/intentPhrase.js';
import Intents from '../models/intents.js';
import IntentVersion from '../models/intentVersion.js';
import { generateEmbedding } from '../utils/embedding.js';

export const createIntent = async (req, res) => {
    try {

        const { intentName, description, intentPhrase, response, status } = req.body;
        // console.log(intentPhrase)
        console.log(response)

        if (!intentName || !description || !intentPhrase) {
            return res.status(400).json({ message: "All fields are required !" })
        }
        // // create intent
        const intent = await Intents.create({
            intentName,
            description
        });

        // // const version = 1;

        // // create intent version
        await IntentVersion.create({
            intentId: intent._id,
            // version,
            response: {
                en: response.en,
                hi: response.hi
            }

        });


        // // generate embeddings for phrases
        // // for (const phrase of trainingPhrases) {

        const embedding = await generateEmbedding(intentPhrase);
        // console.log(embedding[0])

        await IntentPhrase.create({
            intentId: intent._id,
            phrase: intentPhrase,
            embedding
        });

        return res.status(201).json({
            message: "Intent created successfully",
            intentId: intent._id
        });


    } catch (error) {
        // log error to help debugging
        console.error("Error creating intent:", error);
        res.status(500).json({ message: error.message });
    }
}

// Returns all intents
export const getAllIntents = async (req, res) => {
    try {
        const intents = await Intents.aggregate([
            {
                $lookup: {
                    from: "intentversions",
                    localField: "_id",
                    foreignField: "intentId",
                    as: "versions"
                }
            },
            {
                $lookup: {
                    from: "intentphrases",
                    localField: "_id",
                    foreignField: "intentId",
                    as: "phrases"
                }
            }


        ]);
        if (!intents) {
            return res.status(404).json({ message: "intents not found" })
        }
        res.status(200).json(intents);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

//  Filter intents by domains
export const getIntents = async (req, res) => {
    try {
        const { domain } = req.query;
        const filter = domain ? { domain } : {};
        const intents = await Intents.find(filter);
        res.status(200).json(intents);

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

export const getIntentById = async (req, res) => {
    try {
        const intent = await Intents.findById(req.params.id);
        if (!intent) return res.status(404).json({ message: "Intent not found" });
        res.status(200).json(intent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// === !!! latest intent version activation and previous version deactivation logic is not implemented !!! ===
export const updateIntent = async (req, res) => {
    try {
        delete req.body.version; // prevent conflict
        const updatedIntent = await Intents.findByIdAndUpdate(
            req.params.id,
            { $set: req.body, $inc: { version: 1 } }, // Auto-increment version on update
            { new: true, runValidators: true }
        );

        if (!updatedIntent) return res.status(404).json({
            message: 'Intent not found.'
        });
        return res.status(200).json(updatedIntent);

    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}

// @route   DELETE /api/intents/:id
export const deleteIntent = async (req, res) => {
    try {
        const intent = await Intents.findByIdAndDelete(req.params.id);
        if (!intent) return res.status(404).json({ message: "Intent not found" });
        res.status(200).json({ message: "Intent deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
