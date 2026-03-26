import { generateEmbedding } from "../utils/embedding.js";
import IntentPhrase from "../models/intentPhrase.js";
import IntentVersion from "../models/intentVersion.js";
import cosineSimilarity from "compute-cosine-similarity";
import { detectLanguage } from "../utils/detectLanguage.js";
import unAnsweredQueries from "../models/unAnsweredQueries.js";
import messageHistory from "../models/messageHistory.js";

// voice to text
import multer from "multer";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import wav from "wav-decoder";
import { pipeline } from "@xenova/transformers";

// export const getMatchingResponse = async (req, res) => {
//     try {


//         const query = req.body.query;
//         if (!query) {
//             return res.json({

//                 // Then we have to return suggested answers which all are stored 
//                 response: "I am not getting your query"
//             });
//         }

//         // Generate embedding for user query
//         const queryEmbedding = await generateEmbedding(query);
//         // console.log(queryEmbedding)

//         // Find best matching phrase
//         const phrases = await IntentPhrase.find({ isActive: true });

//         let bestMatch = 0;
//         let bestScore = 0.65;

//         for (const phrase of phrases) {

//             const score = cosineSimilarity(queryEmbedding, phrase.embedding);

//             console.log(score)

//             if (score > bestScore) {
//                 bestScore = score;
//                 bestMatch = phrase.intentId;
//             }

//         }

//         if (bestMatch === 0) {

//             // When best matching not found in already stored data then we will consider as un answered queries
//             await unAnsweredQueries.create({
//                 query: query,
//                 embedding: queryEmbedding
//             })
//             return res.json({

//                 // Then we have to return suggested answers which all are stored 
//                 response: "No intent found"
//             });
//         }

//         // Get response from intentversion
//         const responseDoc = await IntentVersion.findOne({
//             intentId: bestMatch,
//             isActive: true
//         })  //.sort({ version: -1 });

//         if (!responseDoc) {
//             return res.json({
//                 response: "No response found"
//             });
//         }

//         // Detect the language of query
//         const lang = detectLanguage(query) // Example output: [ [ 'english', 0.9955 ] ]
//         // console.log(lang)

//         const reply = lang === 'en' ? responseDoc.response.en : responseDoc.response.hi
//         // Return response
//         await messageHistory.create({
//             userId: "1",
//             userMessage: query,
//             botResponse: reply,
//             // detectedIntent,
//             // intentVersion,
//             language: lang === 'en' ? "English" : "Hindi",
//             similarityScore: bestScore,
//             // source
//         })

//         return res.json({
//             intentId: bestMatch,
//             similarity: bestScore,
//             response: lang === 'en' ? responseDoc.response.en : responseDoc.response.hi
//         });

//     } catch (error) {

//         console.error(error);

//         return res.status(500).json({
//             message: error.message
//         });

//     }
// };

export const getMatchingResponse = async (req, res)=>{
    return res.status(200).json({message:"Backend is working perfectly"})
}


ffmpeg.setFfmpegPath(ffmpegPath);

const upload = multer({ dest: "uploads/" });

let transcriber;

const loadModel = async () => {
    if (!transcriber) {
        console.log("Loading Whisper model...");
        transcriber = await pipeline(
            "automatic-speech-recognition",
            "Xenova/whisper-small"
        );
        console.log("Model loaded");
    }
};

export const audioToText = [
    upload.single("audio"),

    async (req, res) => {
        try {
            await loadModel();

            const inputPath = req.file.path;
            const outputPath = `${inputPath}.wav`;

            // 🎧 Convert webm → wav
            ffmpeg(inputPath)
                .toFormat("wav")
                .audioFrequency(16000)
                .audioChannels(1)
                .on("end", async () => {
                    try {
                        // STEP 1: Read WAV file
                        const buffer = fs.readFileSync(outputPath);

                        // STEP 2: Decode WAV → Float32Array
                        const audioData = await wav.decode(buffer);

                        // Take first channel
                        const audio = audioData.channelData[0];

                        // STEP 3: Pass raw audio
                        const result = await transcriber(audio);

                        // 🧹 Cleanup
                        fs.unlinkSync(inputPath);
                        fs.unlinkSync(outputPath);

                        res.json({
                            success: true,
                            text: result.text,
                        });

                    } catch (err) {
                        console.error("Transcription error:", err);
                        res.status(500).json({
                            success: false,
                            message: "Transcription failed",
                        });
                    }
                })
                .on("error", (err) => {
                    console.error("FFmpeg error:", err);
                    res.status(500).json({
                        success: false,
                        message: "Audio conversion failed",
                    });
                })
                .save(outputPath);

        } catch (error) {
            console.error("Server error:", error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
];
