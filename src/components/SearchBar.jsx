import { useEffect, useRef, useState } from 'react';
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
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputFocus = () => {
    if (ref.current) ref.current.focus();
  };

  const submitHandler = e => {
    e.preventDefault();
    setIsHidden(true);
    setText('');
    setChannelId('');
    setOpen(false);
    setValue('table');
    if (ref.current) ref.current.blur();
    search(channelId);
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
      setLoading(true);
      setError('');
      const response = await axios.get(`${URL}/channels/${debouncedText}`, {
        signal: controller.signal,
      });
      if (response.data?.message) {
        setLoading(false);
        setOptions([]);
        setError(response.data.message);
        return;
      }
      console.log(response.data);
      const options = response.data.map(option => ({
        label: option.channelTitle,
        value: option.channelId,
      }));
      setOptions(options);
      setError('');
      setLoading(false);
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
            ref={ref}
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
          <Card className='mt-3 shadow-lg dark:shadow-slate-900 max-h-72 z-50 absolute rounded-lg overflow-x-hidden flex flex-col items-stretch justify-start sm:-left-2 sm:right-0 -left-6 -right-10 py-2'>
            {options.length > 0 ? (
              <>
                {options.map(option => (
                  <Button
                    type='button'
                    variant='ghost'
                    className='justify-start '
                    key={option.value}
                    onClick={() => {
                      setText(option.label);
                      setChannelId(option.value);
                      inputFocus();
                    }}
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
