import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getRecommendations } from "../search/api"

export default async function Recommendations({ paper }: { paper: any }) {
    const recommendations = await getRecommendations({
        title: paper.title,
        abstract: paper.abstract,
        limit: 5,
        identifier: paper.arxiv_id.split('/')[paper.arxiv_id.split('/').length - 1]?.replace("v1","")
    })

    return (
        <section className="flex items-center flex-wrap gap-2">
            {
                recommendations?.map((recommendation) => (
                    <Card key={recommendation.urls[0]}>
                        <CardContent>
                            <CardHeader>
                                <CardTitle>
                                    {recommendation.title}
                                </CardTitle>
                                <CardDescription>
                                    Published in {recommendation.yearPublished}
                                </CardDescription>
                            </CardHeader>
                        </CardContent>
                    </Card>
                ))
            }
        </section>
    )
}