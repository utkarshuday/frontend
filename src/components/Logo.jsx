import { cn } from '@/lib/utils';

function Logo({ children, isHidden, setChannelId }) {
  return (
    <h1
      className={cn(
        'sm:text-3xl text-2xl font-bold sm:block cursor-pointer',
        !isHidden && 'hidden'
      )}
      onClick={() => setChannelId('')}
    >
      {children}
    </h1>
  );
}

export default Logo;
