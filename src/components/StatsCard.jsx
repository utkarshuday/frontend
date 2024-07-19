import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

function StatsCard({ logo, title, content, className, footer }) {
  return (
    <Card className={className}>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {logo}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{content}</div>
      </CardContent>
      {footer && (
        <CardFooter className='text-muted-foreground text-sm text-balance'>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

export default StatsCard;
