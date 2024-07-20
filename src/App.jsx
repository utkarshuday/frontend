import Home from './pages/Home';
import ThemeProvider from './components/ThemeProvider';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import { ModeToggle } from './components/ModeToggle';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from './components/ui/button';
import { cn } from './lib/utils';

function App() {
  const [channelId, setChannelId] = useState('');
  const [value, setValue] = useState('table');
  const [isHidden, setIsHidden] = useState(false);

  console.log(channelId);
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <div className='flex items-center justify-between mb-4 max-w-[1200px] mx-auto md:p-5 p-3'>
        <h1
          className={cn(
            'sm:text-3xl text-2xl font-bold sm:block',
            !isHidden && 'hidden'
          )}
        >
          YoutubeAnalysis
        </h1>
        <div
          className={cn(
            'grid sm:gap-6 gap-3 grid-cols-[1fr,auto]',
            !isHidden && 'flex-1 sm:flex-initial'
          )}
        >
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
          <ModeToggle />
        </div>
      </div>
      <Home channelId={channelId} value={value} setValue={setValue} />
    </ThemeProvider>
  );
}

export default App;
