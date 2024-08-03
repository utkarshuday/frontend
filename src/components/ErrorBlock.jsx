function ErrorBlock({ message }) {
  return (
    <div role='alert'>
      <div className='bg-destructive text-white font-bold rounded-t px-4 py-2'>
        Error
      </div>
      <div className='border border-t-0 border-destructive rounded-b bg-red-100 px-4 py-3 text-destructive'>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default ErrorBlock;
