import { pipeline } from '@huggingface/transformers';

export const generateEmbedding = async (phrase) => {
    // 1. Create a feature-extraction pipeline with a lightweight local model
    const featureExtractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

    // 2. Define your phrases
    // const sentences = [
    //     "That is a happy dog",
    //     "That is a very happy person",
    //     "Today is a sunny day"
    // ];

    // 3. Generate embeddings
    // pooling: 'mean' averages token-level embeddings to produce a single vector
    // normalize: true ensures the vectors are unit-length for cosine similarity
    const output = await featureExtractor(phrase, { pooling: 'mean', normalize: true, dtype: 100 });

    // 4. Output the raw vector data
    // console.log(output.data);
    return Array.from(output.data);
}