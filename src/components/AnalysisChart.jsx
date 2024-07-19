import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
// const chartData = [
//   { reaction: 'Overjoyed', comments: 186 },
//   { reaction: 'Happy', comments: 305 },
//   { reaction: 'Neutral', comments: 237 },
//   { reaction: 'Disliked', comments: 73 },
//   { reaction: 'Angry', comments: 209 },
// ];

const chartConfig = {
  comments: {
    label: 'Comments',
    color: 'hsl(var(--chart-1))',
  },
};

export default function AnalysisChart({ reactions, videoTitle }) {
  const chartData = [
    { reaction: 'Overjoyed', comments: reactions.veryPositive },
    { reaction: 'Happy', comments: reactions.postive },
    { reaction: 'Neutral', comments: reactions.neutral },
    { reaction: 'Disliked', comments: reactions.negative },
    { reaction: 'Angry', comments: reactions.veryNegative },
  ];
  return (
    <Card className='mb-0'>
      <CardHeader>
        <CardTitle>Sentiment Analysis</CardTitle>
        <CardDescription>{videoTitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='min-h-[200px] '>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 10,
              right: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='reaction'
              tickLine={false}
              axisLine={false}
              tickMargin={2}
              interval={'preserveStartEnd'}
              // fontSize={}
              tickFormatter={value => value.slice(0, 15)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' />}
            />
            <Area
              dataKey='comments'
              type='linear'
              fill='var(--color-comments)'
              fillOpacity={0.4}
              stroke='var(--color-comments)'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='leading-none text-muted-foreground'>
          Sentiments of viewers who commented on this video
        </div>
      </CardFooter>
    </Card>
  );
}
