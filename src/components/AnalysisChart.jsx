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
      <CardHeader className='p-3 md:p-6'>
        <CardTitle className='sm:text-2xl text-xl'>
          Sentiments Analysis
        </CardTitle>
        <CardDescription className='text-sm'>{videoTitle}</CardDescription>
      </CardHeader>
      <CardContent className='p-3 md:p-6 pb-0'>
        <ChartContainer config={chartConfig} className='sm:min-h-[200px] '>
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
      <CardFooter className='flex-col items-start gap-2 text-sm p-4 sm:p-6 sm:pt-0 pt-2 '>
        <div className='leading-none text-muted-foreground'>
          Sentiments of viewers who commented on this video
        </div>
      </CardFooter>
    </Card>
  );
}
