import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { useRef, useState } from 'react';
import useOutsideClick from '@/lib/hooks/useOutsideClick';

function AutocompleteInput({ data, search }) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [videoId, setVideoId] = useState('');
  const outsideRef = useOutsideClick(setOpen);
  const ref = useRef(null);

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(value.trim().toLowerCase())
  );
  const submitHandler = e => {
    e.preventDefault();
    setValue('');
    setOpen(false);
    if (ref.current) ref.current.blur();
    console.log(videoId, value);
    if (videoId) search(videoId, value);
  };
  const inputFocus = () => {
    if (ref.current) ref.current.focus();
  };

  return (
    <div className='relative' ref={outsideRef}>
      <form onSubmit={submitHandler} className='flex gap-4'>
        <Input
          ref={ref}
          placeholder='Search a video...'
          value={value}
          onChange={e => {
            if (e.target.value === '') setOpen(true);
            setValue(e.target.value);
          }}
          className='w-[300px]'
          onFocus={() => setOpen(true)}
        />
        <Button type='submit'>
          <Search className='h-5 w-5' />
        </Button>
      </form>
      {open && (
        <Card className='mt-3 shadow-lg dark:shadow-slate-900 max-h-72 z-50 absolute rounded-lg overflow-x-hidden flex flex-col items-stretch justify-start -left-2 right-0 py-2'>
          {filteredData.length > 0 ? (
            <>
              {filteredData.map(video => (
                <Button
                  type='button'
                  variant='ghost'
                  className='justify-start '
                  key={video.id}
                  onClick={() => {
                    setValue(video.title);
                    setVideoId(video.id);
                    inputFocus();
                  }}
                >
                  <p className='truncate'>{video.title}</p>
                </Button>
              ))}
            </>
          ) : (
            <div className='flex items-center text-sm font-medium justify-center h-20'>
              <p>No results</p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

export default AutocompleteInput;
