import { generateEmbedding } from "../utils/embedding.js";
import IntentPhrase from "../models/intentPhrase.js";
import IntentVersion from "../models/intentVersion.js";
import cosineSimilarity from "compute-cosine-similarity";
import { detectLanguage } from "../utils/detectLanguage.js";
import unAnsweredQueries from "../models/unAnsweredQueries.js";


export const getMatchingResponse = async (req, res) => {
    try {


        const query = req.body.query;

        // Generate embedding for user query
        const queryEmbedding = await generateEmbedding(query);
        // console.log(queryEmbedding)

        // Find best matching phrase
        const phrases = await IntentPhrase.find();

        let bestMatch = 0;
        let bestScore = 0.50;

        for (const phrase of phrases) {

            const score = cosineSimilarity(queryEmbedding, phrase.embedding);

            console.log(score)

            if (score > bestScore) {
                bestScore = score;
                bestMatch = phrase.intentId;
            }

        }

        if (bestMatch === 0) {

            // When best matching not found in already stored data then we will consider as un answered queries
            await unAnsweredQueries.create({
                query: query,
                embedding: queryEmbedding
            })
            return res.json({

                // Then we have to return suggested answers which all are stored 
                response: "No intent found"
            });
        }

        // Get response from intentversion
        const responseDoc = await IntentVersion.findOne({
            intentId: bestMatch
        })  //.sort({ version: -1 });

        if (!responseDoc) {
            return res.json({
                response: "No response found"
            });
        }


        // Detect the language of query
        const lang = detectLanguage(query) // Example output: [ [ 'english', 0.9955 ] ]
        // console.log(lang)
        // Return response
        res.json({
            intentId: bestMatch,
            similarity: bestScore,
            response: lang === 'en' ? responseDoc.response.en : responseDoc.response.hi
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }
};
