import { useEffect, useState } from 'react';

const messages = [
  'Hold on for a few seconds...',
  'Analyzing comments...',
  'Loading data...',
  'Almost done...',
];

function AnalysisLoader({ interval }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex(prevIndex =>
        prevIndex === messages.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(messageInterval);
  }, [interval]);

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='loader'></div>
      <p className='mt-3'>{messages[currentMessageIndex]}</p>
    </div>
  );
}

export default AnalysisLoader;
