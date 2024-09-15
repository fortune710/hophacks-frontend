import { PlaceholdersAndVanishInput } from "@/components/ui/placeholder-and-vanish-input";
import { Searchbar } from "@/components/ui/searchbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SentimentChart } from "./sentiment-chart";
import { Badge } from "@/components/ui/badge";
import { getResearchPaperSentiment } from "./api";
import { sentimentToScore } from "@/utils/functions";
import { Progress } from "@/components/ui/progress";
import { SearchbarContainer } from "./searchbar-container";

export default async function SearchPage({ searchParams }: { searchParams: {[x: string] : string} }) {
    const query = searchParams.query;

    const response = await fetch("http://localhost:5000/recent_papers?search_term="+query, {
        method: "GET",
        next: {
            tags: ["search-term", query]
        }
    });
    const papers = await response.json() as {
        year: number,
        title: string,
        authors: string,
        categories: string[],
        arxiv_id: string,
        abstract: string
    }[];

    const res = await fetch("http://localhost:5000/analyze_reddit_sentiment?search_term=" + query, {
        next: {
            tags: ["reddit-sentiment", query]
        }
    });


    
    const sentiment = await res.json() as  {
        average_sentiment: number,
        num_posts_analyzed: number
    }

    return (
        <main>
            <SearchbarContainer defaultValue={query}/>

            <section className="w-full relative max-w-xl mx-auto mt-4 md:mt-7">
                <Tabs defaultValue="papers">
                    <div>
                        <TabsList>
                            <TabsTrigger value="papers">
                                Research Papers
                            </TabsTrigger>
                            <TabsTrigger value="analysis">
                                Sentiment Analysis
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent className="space-y-4 md:space-y-7 pt-3" value="papers">
                        {
                            papers.map((paper) => (
                                <SearchResult 
                                    keyword={query} 
                                    paper={paper}
                                    key={paper.arxiv_id}
                                />
                            ))
                        }

                    </TabsContent>
                    <TabsContent value="analysis">
                        <SentimentChart 
                            totalPosts={sentiment.num_posts_analyzed} 
                            score={sentiment.average_sentiment} 
                        />
                    </TabsContent>

                </Tabs>

            </section>
        </main>
    )
}

async function SearchResult({ paper, keyword }: { paper: any, keyword: string }) {
    const data = await getResearchPaperSentiment(paper.abstract, keyword);
    const score = !data ? 0 : sentimentToScore(data.sentiment);

    return (
        <div>
            <p className="text-sm">Published in {paper.year}</p>
            <h2 className="text-2xl font-bold">{paper.title}</h2>
            <p>
                <span className="font-semibold">Abstract: </span>
                {paper.abstract.slice(0, 300) + "..."}
            </p>
            <div className="mt-1">
                <p className="text-xs mb-0.5">Abstract Sentiment: {score >= 50 ? "Positive" : "Negative"}</p>
                <Progress className="text-red-500" key={score} value={score}/>
            </div>
        </div>
    )
}