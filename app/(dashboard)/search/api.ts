import { cache } from "react";

const BASE_URL = "https://hophacks-marshallwallace-apis.vercel.app"

export const getResearchPaperSentiment = async (abstract: string, searchTerm: string) => {
    if (!abstract) return
    const response = await fetch(`${BASE_URL}/analyze_sentiment?search_term=${searchTerm}&text=${abstract}`, {
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
    const response = await fetch(BASE_URL + "/recent_papers?search_term="+query, {
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
    const res = await fetch(BASE_URL + "/analyze_reddit_sentiment?search_term=" + query, {
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

export const getGraphData = async (arxiv_id: string) => {
    const id = arxiv_id.split('/')[arxiv_id.split('/').length - 1]?.replace("v1","");
    const res = await fetch(BASE_URL + "/citation_graph?arxiv_id=" + id, {
        next: {
            tags: ["graph", id]
        }
    });
    return await res.json();

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
    const response = await fetch(BASE_URL + '/recommend', {
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