import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import useOutsideClick from '@/lib/hooks/useOutsideClick';
import { URL } from '@/lib/requests';
import { cn } from '@/lib/utils';

export default function SearchBar({
  inputRef,
  search,
  setValue,
  className,
  setIsHidden,
}) {
  const [options, setOptions] = useState([]);
  const [channelId, setChannelId] = useState('');
  const [text, setText] = useState('');
  const [debouncedText] = useDebounce(text, 500);
  const [open, setOpen] = useState(false);
  const outsideRef = useOutsideClick(setOpen);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const reset = () => {
    setIsHidden(true);
    setText('');
    setChannelId('');
    setOpen(false);
    setValue('table');
    if (inputRef.current) inputRef.current.blur();
  };

  const submitHandler = e => {
    e.preventDefault();
    reset();
    search(channelId);
  };

  const buttonHandler = id => {
    reset();
    search(id);
  };

  useEffect(() => {
    const controller = new AbortController();
    if (debouncedText.length <= 3) {
      setOptions([]);
      setLoading(false);
      setError('');
      return;
    }
    (async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`${URL}/channels/${debouncedText}`, {
          signal: controller.signal,
        });
        const options = response.data.map(option => ({
          label: option.channelTitle,
          value: option.channelId,
        }));
        setOptions(options);
        setError('');
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 429) {
          setError('Oops! YouTube API quota exceeded');
        } else if (err.request) {
          setError('Sorry! Backend is down');
        } else {
          setError('Unexpected error occurred');
        }
        setLoading(false);
        setOptions([]);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [debouncedText]);

  return (
    <>
      <div className={cn('relative sm:block', className)} ref={outsideRef}>
        <form
          onSubmit={submitHandler}
          className='grid grid-cols-[1fr,auto] gap-4'
        >
          <Input
            ref={inputRef}
            placeholder='Search a channel...'
            value={text}
            onChange={e => {
              if (e.target.value === '') setOpen(true);
              setText(e.target.value);
            }}
            onFocus={() => setOpen(true)}
          />
          <Button type='submit'>
            <Search className='h-4 w-4' />
          </Button>
        </form>
        {open && (
          <Card className='mt-3 shadow-lg  max-h-72 z-50 absolute rounded-lg overflow-x-hidden flex flex-col items-stretch justify-start sm:-left-2 sm:right-0 -left-6 -right-10 py-2'>
            {options.length > 0 ? (
              <>
                {options.map(option => (
                  <Button
                    type='button'
                    variant='ghost'
                    className='justify-start '
                    key={option.value}
                    onClick={() => buttonHandler(option.value)}
                  >
                    <p className='truncate'>{option.label}</p>
                  </Button>
                ))}
              </>
            ) : (
              <div className='flex items-center text-sm font-medium justify-center h-20 p-4'>
                <p>
                  {!loading &&
                    !error &&
                    text.length === 0 &&
                    'Nothing to search'}
                  {!loading && !error && text.length !== 0 && 'No results'}
                  {loading && !error && 'Searching...'}
                  {!loading && error}
                </p>
              </div>
            )}
          </Card>
        )}
      </div>
    </>
  );
}
