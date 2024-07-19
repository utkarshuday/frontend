import Home from './pages/Home';
import ThemeProvider from './components/ThemeProvider';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import { ModeToggle } from './components/ModeToggle';

function App() {
  const [channelId, setChannelId] = useState('');
  const [value, setValue] = useState('table');

  console.log(channelId);
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <div className='flex items-center justify-between mb-4 max-w-[1200px] mx-auto p-5'>
        <h1 className='pl-2 text-3xl font-bold'>YoutubeAnalysis</h1>
        <div className='flex flex-row-reverse gap-6 '>
          <ModeToggle />
          <SearchBar search={setChannelId} setValue={setValue} />
        </div>
      </div>
      <Home channelId={channelId} value={value} setValue={setValue} />
    </ThemeProvider>
  );
}

export default App;
