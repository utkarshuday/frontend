import Home from './pages/Home';
import ThemeProvider from './components/ThemeProvider';
import { useEffect, useRef, useState } from 'react';
import { ModeToggle } from './components/ModeToggle';
import { cn } from './lib/utils';
import Logo from './components/Logo';
import ResponsiveSearchBar from './components/ResponsiveSearchBar';
import './App.css';

function App() {
  const [channelId, setChannelId] = useState('');
  const [value, setValue] = useState('table');
  const [isHidden, setIsHidden] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isHidden && inputRef.current) inputRef.current.focus();
  }, [isHidden]);

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <div className='flex items-center justify-between mb-4 max-w-[1200px] mx-auto md:p-5 p-3'>
        <Logo isHidden={isHidden} setChannelId={setChannelId}>
          YoutubeAnalysis
        </Logo>
        <div
          className={cn(
            'grid sm:gap-6 gap-3 grid-cols-[1fr,auto]',
            !isHidden && 'flex-1 sm:flex-initial'
          )}
        >
          <ResponsiveSearchBar
            inputRef={inputRef}
            isHidden={isHidden}
            setIsHidden={setIsHidden}
            setChannelId={setChannelId}
            setValue={setValue}
          />
          <ModeToggle />
        </div>
      </div>
      <Home
        channelId={channelId}
        value={value}
        setValue={setValue}
        inputRef={inputRef}
        setIsHidden={setIsHidden}
      />
    </ThemeProvider>
  );
}

export default App;
