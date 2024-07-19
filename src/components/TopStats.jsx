import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useState } from 'react';

export const description = 'An interactive bar chart';

const chartConfig = {
  views: {
    label: 'Views',
    color: 'hsl(var(--chart-1))',
  },
  likes: {
    label: 'Likes',
    color: 'hsl(var(--chart-2))',
  },
  comments: {
    label: 'Comments',
    color: 'hsl(var(--chart-3))',
  },
};

export default function TopStats({ chartData, details }) {
  const [activeChart, setActiveChart] = useState('views');

  const total = {
    likes: details.maxLikes,
    views: details.maxViews,
    comments: details.maxComments,
  };

  return (
    <Card>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 md:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 md:py-6'>
          <CardTitle>Top Charts</CardTitle>
          <CardDescription>
            Showing performance of the top {chartData.length} videos
          </CardDescription>
        </div>
        <div className='flex'>
          {['views', 'likes', 'comments'].map(key => {
            const chart = key;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className='relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 md:border-l md:border-t-0 md:px-8 md:py-6'
                onClick={() => setActiveChart(chart)}
              >
                <span className='text-xs text-muted-foreground md:whitespace-nowrap'>
                  Maximum {chartConfig[chart].label}
                </span>
                <span className='text-lg font-bold leading-none sm:text-3xl'>
                  {total[key].toLocaleString('en-IN')}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='title'
              tickLine={false}
              axisLine={false}
              minTickGap={5}
              tickFormatter={(value, index) =>
                index === 0 || (index + 1) % 5 === 0 ? index + 1 : ''
              }
            />
            <ChartTooltip
              content={<ChartTooltipContent className='w-[200px]' />}
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
