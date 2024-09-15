"use client"

import { useState, useEffect } from 'react'
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { sentimentToScore } from "@/utils/functions"

export const description = "Two radial charts with stacked sections"

const chartConfig = {
  positive: {
    label: "Positive",
    color: "hsl(var(--chart-1))",
  },
  negative: {
    label: "Negative",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function SentimentChart({ 
  score, 
  totalPosts, 
  abstractScore, 
  totalAbstracts, 
  topic 
}: { 
  score: number, 
  totalPosts: number, 
  abstractScore: number, 
  totalAbstracts: number, 
  topic: string 
}) {
  const [thumbsUp, setThumbsUp] = useState(0);
  const [thumbsDown, setThumbsDown] = useState(0);
  const [hotOrNotResult, setHotOrNotResult] = useState<string | null>(null);
  const [hotOrNotReasoning, setHotOrNotReasoning] = useState<string | null>(null);
  const [hotOrNotRecommendation, setHotOrNotRecommendation] = useState<string | null>(null);

  const redditPercentage = sentimentToScore(score);
  const abstractPercentage = sentimentToScore(abstractScore);

  const chartData = [
    { 
      month: "january", 
      positive: redditPercentage >= 50 ? redditPercentage : 100 - redditPercentage, 
      negative: redditPercentage < 50 ? redditPercentage : 100 - redditPercentage 
    }
  ]

  const abstractChartData = [
    {
      month: "february",
      positive: abstractPercentage >= 50 ? abstractPercentage : 100 - abstractPercentage,
      negative: abstractPercentage < 50 ? abstractPercentage : 100 - abstractPercentage
    }
  ]

  const handleThumbsUp = () => {
    if (thumbsUp < 100 && thumbsDown < 100) {
      setThumbsUp(thumbsUp + 1);
    }
  };

  const handleThumbsDown = () => {
    if (thumbsUp < 100 && thumbsDown < 100) {
      setThumbsDown(thumbsDown + 1);
    }
  };

  const thumbsUpPercentage = Math.min((thumbsUp / 100) * 100, 100);
  const thumbsDownPercentage = Math.min((thumbsDown / 100) * 100, 100);
  useEffect(() => {
    const fetchHotOrNot = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/hot-or-not?search_term=${encodeURIComponent(topic)}`, {
          method: 'GET',
        });

        const data = await response.json();
        
        // Encode the raw result without parsing
        setHotOrNotReasoning(data.result || "No reasoning provided");
        setHotOrNotRecommendation(data.recommendation || "N/A");
      } catch (error) {
        console.error('Error fetching hot-or-not result:', error);
        setHotOrNotReasoning("Error fetching result");
        setHotOrNotRecommendation("N/A");
      }
    };

    if (topic) {
      fetchHotOrNot();
    }
  }, [topic]);

  const RadialBarChartComponent = ({ data, innerLabel, item_type }: { data: any[], innerLabel: string, item_type: string }) => (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square w-full max-w-[250px]"
    >
      <RadialBarChart
        data={data}
        endAngle={180}
        innerRadius={80}
        outerRadius={130}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 16}
                      className="fill-foreground text-2xl font-bold tracking-wide"
                    >
                      {innerLabel}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 8}
                      className="fill-muted-foreground tracking-wide"
                    >
                      {item_type}
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
        <RadialBar
          dataKey="positive"
          stackId="a"
          cornerRadius={5}
          fill="#1b9648"
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="negative"
          fill="#c40417"
          stackId="a"
          cornerRadius={5}
          className="stroke-transparent stroke-2"
        />
      </RadialBarChart>
    </ChartContainer>
  )

  return (
    <Card className="flex flex-col space-y-6">
      <CardHeader className="items-center pb-0">
        <CardTitle className="tracking-wide leading-relaxed">Hot or Not: {topic}</CardTitle>
        <CardDescription className="tracking-wide leading-relaxed mt-2">
          What do you think about this topic?
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <div className="flex items-center gap-4 font-medium leading-relaxed">
          <button 
            onClick={handleThumbsUp} 
            disabled={thumbsUp === 100 || thumbsDown === 100} 
            className="px-4 py-2 bg-green-500 text-white rounded tracking-wide"
          >
            👍 {thumbsUp}
          </button>
          <button 
            onClick={handleThumbsDown} 
            disabled={thumbsUp === 100 || thumbsDown === 100} 
            className="px-4 py-2 bg-red-500 text-white rounded tracking-wide"
          >
            👎 {thumbsDown}
          </button>
        </div>
        <div className="w-full space-y-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${thumbsUpPercentage}%` }}></div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${thumbsDownPercentage}%` }}></div>
          </div>
        </div>
        {(thumbsUp === 100 || thumbsDown === 100) && (
          <div className="font-bold text-lg tracking-wide leading-relaxed">
            {thumbsUp === 100 ? "Hot!" : "Not!"}
          </div>
        )}
        
        {hotOrNotReasoning ? (
          <div className="text-center mt-4">
            <h3 className="font-semibold mb-2">AI Opinion:</h3>
            <p className="text-sm mb-2">{hotOrNotReasoning}</p>
            {hotOrNotRecommendation !== "N/A" && (
              <p className="text-sm"><strong>Recommendation:</strong> {hotOrNotRecommendation}</p>
            )}
          </div>
        ) : (
          <p className="mt-4 text-lg text-gray-500">Loading hot-or-not result...</p>
        )}
      </CardContent>

      <CardHeader className="items-center pb-0 pt-6 border-t">
        <CardTitle className="tracking-wide leading-relaxed">Sentiment Analysis: {topic}</CardTitle>
        <CardDescription className="tracking-wide leading-relaxed">Reddit Posts vs Research Papers</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-8">
        <RadialBarChartComponent 
          data={chartData} 
          innerLabel={totalPosts.toLocaleString()} 
          item_type="Reddit Posts" 
        />
        <RadialBarChartComponent 
          data={abstractChartData} 
          innerLabel={totalAbstracts.toLocaleString()} 
          item_type="Papers Analyzed" 
        />
      </CardContent>
    </Card>
  )
}
