import { Button } from './ui/button';

function Landing({ inputRef, setIsHidden }) {
  const inputFocus = () => {
    setIsHidden(false);
    if (inputRef.current) inputRef.current.focus();
  };
  return (
    <div className='p-4 min-h-[80vh] flex flex-col gap-4 lg:gap-7 justify-center'>
      <h1 className='font-bold lg:text-5xl text-3xl text-center max-w-[18ch] mx-auto'>
        Deep Dive Into Channel and Video Analytics
      </h1>
      <p className='max-w-[38ch] lg:text-2xl text-base text-center mx-auto mt-5'>
        Unlock the full potential of your YouTube content with our advanced
        analytics platform. Whether you&apos;re a creator looking to grow your
        channel, a brand seeking to optimize your video strategy, or just
        curious about the data behind your favorite videos, we provide in-depth
        insights to help you succeed.
      </p>
      <Button
        onClick={() => inputFocus()}
        className='mx-auto mt-5 text-base flex items-center font-semibold bg-[hsl(222.2,84%,50%)] dark:bg-[hsl(222.2,84%,70%)] px-8 py-4 hover:bg-[hsl(222.2,84%,40%)] hover:dark:bg-[hsl(222.2,84%,80%)]'
      >
        Analyze Now
      </Button>
    </div>
  );
}

export default Landing;
