import IntentPhrase from '../models/intentPhrase.js';
import Intents from '../models/intents.js';
import IntentVersion from '../models/intentVersion.js';
import { generateEmbedding } from '../utils/embedding.js';


// export const createIntent = async (req, res) => {
//     try {

//         const { intentName, description, intentPhrase, response, status } = req.body;
//         // console.log(intentPhrase)
//         console.log(response)

//         if (!intentName || !description || !intentPhrase) {
//             return res.status(400).json({ message: "All fields are required !" })
//         }
//         // // create intent
//         const intent = await Intents.create({
//             intentName,
//             description
//         });

//         // // const version = 1;

//         // // create intent version
//         await IntentVersion.create({
//             intentId: intent._id,
//             // version,
//             response: {
//                 en: response.en,
//                 hi: response.hi
//             }

//         });


//         // // generate embeddings for phrases
//         // // for (const phrase of trainingPhrases) {

//         const embedding = await generateEmbedding(intentPhrase);
//         // console.log(embedding[0])

//         await IntentPhrase.create({
//             intentId: intent._id,
//             phrase: intentPhrase,
//             embedding
//         });

//         return res.status(201).json({
//             message: "Intent created successfully",
//             intentId: intent._id
//         });


//     } catch (error) {
//         // log error to help debugging
//         console.error("Error creating intent:", error);
//         res.status(500).json({ message: error.message });
//     }
// }


export const createIntent = async (req, res) => {
    try {
        const { intentName, description, intentPhrase, response, status } = req.body;

        // Validation
        if (!intentName || !description || !intentPhrase || !response) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Step 1: Create base intent
        const intent = await Intents.create({
            intentName,
            description,
            status,
            version: 1, // initial version
        });

        // Step 2: Create initial active version
        await IntentVersion.create({
            intentId: intent._id,
            version: 1,
            isActive: true, // ✅ default active
            response: {
                en: response.en,
                hi: response.hi,
            },
        });

        // Step 3: Generate embedding
        const embedding = await generateEmbedding(intentPhrase);

        //  Step 4: Create initial phrase
        await IntentPhrase.create({
            intentId: intent._id,
            version: 1,
            phrase: intentPhrase,
            embedding,
            isActive: true, //  default active
        });

        return res.status(201).json({
            success: true,
            message: "Intent created successfully",
            intentId: intent._id,
            version: 1,
        });

    } catch (error) {
        console.error("Create Intent Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Returns all intents
// export const getAllIntents = async (req, res) => {
//     try {
//         const intents = await Intents.aggregate([
//             {
//                 $lookup: {
//                     from: "intentversions",
//                     localField: "_id",
//                     foreignField: "intentId",
//                     as: "versions"
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "intentphrases",
//                     localField: "_id",
//                     foreignField: "intentId",
//                     as: "phrases"
//                 }


//             }


//         ]);
//         if (!intents) {
//             return res.status(404).json({ message: "intents not found" })
//         }
//         res.status(200).json(intents);

//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }

// }

export const getAllIntents = async (req, res) => {
    try {
        const intents = await Intents.aggregate([

            // Get ONLY active versions
            {
                $lookup: {
                    from: "intentversions",
                    let: { intentId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$intentId", "$$intentId"] },
                                        { $eq: ["$isActive", true] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "versions"
                }
            },

            //  Get ONLY active phrases
            {
                $lookup: {
                    from: "intentphrases",
                    let: { intentId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$intentId", "$$intentId"] },
                                        { $eq: ["$isActive", true] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "phrases"
                }
            },

            // Optional: remove intents with no active version
            {
                $match: {
                    "versions.0": { $exists: true }
                }
            }

        ]);

        if (!intents.length) {
            return res.status(404).json({ message: "Intents not found" });
        }

        res.status(200).json(intents);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getIntentById = async (req, res) => {
    try {
        const intent = await Intents.findById(req.params.id);
        if (!intent) return res.status(404).json({ message: "Intent not found" });
        res.status(200).json(intent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// export const updateIntent = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { intentName, description, intentPhrase, response, status } = req.body;

//         // Validation
//         if (!intentName || !description || !intentPhrase || !response) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required",
//             });
//         }

//         // Find existing intent
//         const intent = await Intents.findById(id);

//         if (!intent) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Intent not found",
//             });
//         }

//         // Update main intent
//         intent.intentName = intentName;
//         intent.description = description;
//         intent.status = status;
//         intent.version = (intent.version || 1) + 1;

//         await intent.save();

//         const newVersion = intent.version;

//         // Save new response version
//         await IntentVersion.create({
//             intentId: intent._id,
//             version: newVersion,
//             response: {
//                 en: response.en,
//                 hi: response.hi,
//             },
//         });

//         // Generate embedding
//         const embedding = await generateEmbedding(intentPhrase);

//         // Save new phrase
//         await IntentPhrase.create({
//             intentId: intent._id,
//             version: newVersion,
//             phrase: intentPhrase,
//             embedding,
//         });

//         return res.status(200).json({
//             success: true,
//             message: "Intent updated successfully",
//             intentId: intent._id,
//             version: newVersion,
//         });

//     } catch (error) {
//         console.error("Update Intent Error:", error);
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };


export const updateIntent = async (req, res) => {
    try {
        const { id } = req.params;
        const { intentName, description, intentPhrase, response, status } = req.body;

        // Validation
        if (!intentName || !description || !intentPhrase || !response) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Find intent
        const intent = await Intents.findById(id);

        if (!intent) {
            return res.status(404).json({
                success: false,
                message: "Intent not found",
            });
        }

        //  Step 1: Deactivate old versions
        await IntentVersion.updateMany(
            { intentId: id, isActive: true },
            { $set: { isActive: false } }
        );

        await IntentPhrase.updateMany(
            { intentId: id, isActive: true },
            { $set: { isActive: false } }
        );

        //  Step 2: Update intent base
        intent.intentName = intentName;
        intent.description = description;
        intent.status = status;
        intent.currentVersion = (intent.currentVersion || 1) + 1;

        await intent.save();

        const newVersion = intent.version;

        // Step 3: Create new active version
        await IntentVersion.create({
            intentId: intent._id,
            version: newVersion,
            isActive: true,
            response: {
                en: response.en,
                hi: response.hi,
            },
        });

        // Generate embedding
        const embedding = await generateEmbedding(intentPhrase);

        // Step 4: Create new active phrase
        await IntentPhrase.create({
            intentId: intent._id,
            version: newVersion,
            phrase: intentPhrase,
            embedding,
            isActive: true,
        });

        return res.status(200).json({
            success: true,
            message: "Intent updated successfully",
            intentId: intent._id,
            version: newVersion,
        });

    } catch (error) {
        console.error("Update Intent Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

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
