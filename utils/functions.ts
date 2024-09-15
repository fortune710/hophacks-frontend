export function sentimentToScore(sentiment: number): number {
    // Ensure the sentiment is within the valid range
    if (sentiment < -1 || sentiment > 1) {
        throw new Error("Sentiment score must be between -1 and 1.");
    }
    
    // Convert the sentiment from range [-1, 1] to range [0, 100]
    const score = (sentiment + 1) * 50;
    return score;
}