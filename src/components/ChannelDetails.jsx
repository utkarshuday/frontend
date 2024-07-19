import { Eye, Users, Video } from 'lucide-react';
import StatsCard from './StatsCard';
import AvatarCard from './AvatarCard';

export default function ChannelDetails({ details }) {
  return (
    <div className='grid gap-4 grid-cols-[auto,5fr,4fr,4fr] mb-4'>
      <AvatarCard details={details} />
      <StatsCard
        title='Total Views'
        logo={<Eye className='h-4 w-4 text-muted-foreground' />}
        content={details.viewCount.toLocaleString('en-IN')}
      />
      <StatsCard
        title='Subscribers'
        logo={<Users className='h-4 w-4 text-muted-foreground' />}
        content={details.subscriberCount.toLocaleString('en-IN')}
      />
      <StatsCard
        title='Total Videos'
        logo={<Video className='h-4 w-4 text-muted-foreground' />}
        content={details.videoCount.toLocaleString('en-IN')}
      />
    </div>
  );
}
