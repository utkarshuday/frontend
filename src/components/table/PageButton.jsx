import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export default function PageButton({ children, className, ...rest }) {
  return (
    <Button
      {...rest}
      variant='outline'
      className={cn(
        'hidden h-8 w-8 p-0 lg:flex disabled:cursor-not-allowed',
        className
      )}
    >
      {children}
    </Button>
  );
}
