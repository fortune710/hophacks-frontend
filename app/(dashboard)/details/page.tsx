import { Badge } from "@/components/ui/badge";
import { getSinglePaper } from "../search/api";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function PaperDetailsPage({ searchParams }: { searchParams: {[x: string] : string} }) {
    const query = searchParams.query;
    const title = searchParams.title;

    const paper = await getSinglePaper(query, title);

    return (
        <main>
            <section className="w-full relative max-w-xl mx-auto mt-4 md:mt-7">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{paper?.title}</h2>
                    <p className="font-medium text-sm">Written by {paper?.authors.join(', ')}</p>
                    <p className="text-sm">Published in {paper?.year}</p>
                </div>

                <div className="mt-1">
                    {
                        paper?.categories.map((category) => (
                            <Badge key={category} variant="outline">
                                {category}
                            </Badge>
                        ))
                    }
                </div>
                
                <div className="mt-4">
                    <p className="font-semibold">Abstract</p>
                    <p>{paper?.abstract}</p>
                </div>

                <Link 
                    className="bg-primary text-white rounded-[50px] mt-3 flex w-full py-4 justify-center gap-5"
                    target="_blank" href={paper?.arxiv_id!}
                >
                    <ArrowRight className="h-6 w-6" />
                    Click here to read more
                </Link>

            </section>

        </main>
    )
}