import { ArrowLeft, Search } from 'lucide-react';
import { Button } from './ui/button';
import SearchBar from './SearchBar';
import { cn } from '@/lib/utils';

function ResponsiveSearchBar({
  inputRef,
  isHidden,
  setIsHidden,
  setChannelId,
  setValue,
}) {
  return (
    <div>
      <div className='flex'>
        <Button
          variant='ghost'
          className={cn(
            'sm:hidden px-0 pr-4 hover:bg-transparent',
            isHidden && 'hidden'
          )}
          onClick={() => setIsHidden(true)}
        >
          <ArrowLeft className='h-5 w-5' />
        </Button>
        <SearchBar
          inputRef={inputRef}
          search={setChannelId}
          setIsHidden={setIsHidden}
          setValue={setValue}
          className={cn(isHidden && 'hidden', 'flex-1')}
        />
        {isHidden && (
          <Button
            type='button'
            className='sm:hidden'
            onClick={() => setIsHidden(false)}
          >
            <Search className='h-4 w-4 p-0' />
          </Button>
        )}
      </div>
    </div>
  );
}

export default ResponsiveSearchBar;
