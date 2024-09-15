"use client"

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
