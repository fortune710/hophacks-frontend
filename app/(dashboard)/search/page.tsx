import { PlaceholdersAndVanishInput } from "@/components/ui/placeholder-and-vanish-input";
import { Searchbar } from "@/components/ui/searchbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SentimentChart } from "./sentiment-chart";
import { Badge } from "@/components/ui/badge";
import { analyzeRedditPosts, fetchRecentPapers, getResearchPaperSentiment } from "./api";
import { sentimentToScore } from "@/utils/functions";
import { Progress } from "@/components/ui/progress";
import { SearchbarContainer } from "./searchbar-container";
import Link from "next/link";
import { Suspense } from "react";

export default async function SearchPage({ searchParams }: { searchParams: {[x: string] : string} }) {
    const query = searchParams.query;

    const papers = await fetchRecentPapers(query);
    const sentiment = await analyzeRedditPosts(query);

    // Calculate average abstract sentiment
    let totalAbstractSentiment = 0;
    let abstractCount = 0;

    for (const paper of papers) {
        const data = await getResearchPaperSentiment(paper.abstract, query);
        if (data) {
            totalAbstractSentiment += data.sentiment;
            abstractCount++;
        }
    }

    const averageAbstractSentiment = abstractCount > 0 ? totalAbstractSentiment / abstractCount : 0;

    return (
        <main>

            <Suspense fallback={<h2>Loading...</h2>}>
                <section className="w-full relative max-w-xl mx-auto space-y-4 md:space-y-7">
                    <SearchbarContainer defaultValue={query}/>
                    
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
                        <TabsContent className="pt-3" value="papers">
                            {
                                papers.map((paper) => (
                                    <div className="mb-4 md:mb-6">
                                        <SearchResult 
                                            keyword={query} 
                                            paper={paper}
                                            key={paper.arxiv_id}
                                        />
                                    </div>
                                ))
                            }
                        </TabsContent>
                        <TabsContent value="analysis">
                            <SentimentChart 
                                score={sentiment.average_sentiment}
                                totalPosts={sentiment.num_posts_analyzed}
                                abstractScore={averageAbstractSentiment}
                                totalAbstracts={abstractCount}
                                topic={query}
                            />
                        </TabsContent>
                    </Tabs>
                </section>
            </Suspense>
        </main>
    )
}

async function SearchResult({ paper, keyword }: { paper: any, keyword: string }) {
    const data = await getResearchPaperSentiment(paper.abstract, keyword);
    const score = !data ? 0 : sentimentToScore(data.sentiment);

    return (
        <Link className="cursor-pointer mt-4 md:mt-7" href={`/details?title=${paper?.title}&query=${keyword}`}>
            <p className="text-sm">Published in {paper.year}</p>
            <h2 className="text-xl font-bold">{paper.title}</h2>
            <p>
                <span className="font-semibold">Abstract: </span>
                {paper.abstract.slice(0, 300) + "..."}
            </p>
            <div className="mt-1">
                <p className="text-xs mb-0.5">Abstract Sentiment: {score >= 50 ? "Positive" : "Negative"}</p>
                <Progress className="text-red-500" key={score} value={score}/>
            </div>
        </Link>
    )
}