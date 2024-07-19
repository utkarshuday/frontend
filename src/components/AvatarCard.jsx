import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { truncateString } from '@/lib/utils';

function AvatarCard({ details }) {
  return (
    <Card className='p-4 max-w-[400px] flex flex-col justify-center'>
      <CardHeader className='p-0 flex-row items-center gap-4 space-y-0 mb-2'>
        <Avatar>
          <AvatarImage src={details.thumbnail} alt='profile' />
          <AvatarFallback>
            {details.channelTitle
              .split(' ')
              .map(word => word[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className='text-lg -mb-1 pb-0'>
            {details.channelTitle}
          </CardTitle>
          <CardDescription className='text-sm'>
            {details.customUrl}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className='p-0 text-sm hidden lg:block'>
        {truncateString(details.channelDescription, 112)}
      </CardContent>
    </Card>
  );
}

export default AvatarCard;
