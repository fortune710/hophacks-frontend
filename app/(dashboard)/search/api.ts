export const getResearchPaperSentiment = async (abstract: string, searchTerm: string) => {
    if (!abstract) return
    const response = await fetch(`http://localhost:5000/analyze_sentiment?search_term=${searchTerm}&text=${abstract}`, {
        next: {
            tags: ["abstract-sentiment", abstract]
        }
    });
    const data = await response.json() as {
        sentiment: number
    }
    return data
}