import StatsCard from '@/components/StatsCard';
import TopChart from '@/components/TopChart';
import { ArrowUp, MessageCircle, ThumbsUp } from 'lucide-react';

function TopStats({ details, topChartsDetails }) {
  console.log(topChartsDetails);
  return (
    <div className='grid grid-rows-3 grid-cols-[3fr,1fr] gap-4'>
      <TopChart className='row-span-3' chartData={topChartsDetails} />
      <StatsCard
        title='Highest Views'
        content={details.maxViews.toLocaleString('en-IN')}
        logo={<ArrowUp className='h-4 w-4 text-muted-foreground' />}
        footer='1. Introduction to Algorithms using Java'
      />
      <StatsCard
        title='Highest Likes'
        content={details.maxLikes.toLocaleString('en-IN')}
        logo={<ThumbsUp className='h-4 w-4 text-muted-foreground' />}
      />
      <StatsCard
        title='Highest Comments'
        content={details.maxComments.toLocaleString('en-IN')}
        logo={<MessageCircle className='h-4 w-4 text-muted-foreground' />}
      />
    </div>
  );
}

export default TopStats;
