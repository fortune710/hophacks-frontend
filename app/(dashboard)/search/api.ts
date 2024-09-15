import { cache } from "react";

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

export const fetchRecentPapers = async (query: string) => {
    const response = await fetch("http://localhost:5000/recent_papers?search_term="+query, {
        method: "GET",
        next: {
            tags: ["search-term", query]
        }
    });
    const papers = await response.json() as {
        year: number,
        title: string,
        authors: string[],
        categories: string[],
        arxiv_id: string,
        abstract: string
    }[];
    return papers

}

export const analyzeRedditPosts = async (query: string) => {
    const res = await fetch("http://localhost:5000/analyze_reddit_sentiment?search_term=" + query, {
        next: {
            tags: ["reddit-sentiment", query]
        }
    });


    
    const sentiment = await res.json() as  {
        average_sentiment: number,
        num_posts_analyzed: number
    }

    return sentiment;
}

export const getSinglePaper = async (query: string, title: string) => {
    const papers = await fetchRecentPapers(query);
    return papers.find((paper) => paper.title === title);
}

interface RecommendationParams {
    limit: number;
    identifier: string;
    abstract: string;
    title: string;
}

interface RecommendationResponse {
    title: string,
    urls: string[],
    yearPublished: string
}
  

export const getRecommendations = cache(async (params: RecommendationParams): Promise<RecommendationResponse[]> => {
    const response = await fetch('http://localhost:5000/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return await response.json();
  });