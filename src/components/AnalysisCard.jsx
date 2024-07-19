import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function AnalysisCard({
  className,
  title,
  percentage,
  description,
  indicatorColor,
}) {
  return (
    <Card className={className}>
      <CardHeader className='pb-2'>
        <CardDescription>{title}</CardDescription>
        <CardTitle className='text-4xl'>{Math.round(percentage)} %</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-xs text-muted-foreground'>{description}</div>
      </CardContent>
      <CardFooter>
        <Progress
          value={percentage}
          indicatorColor={indicatorColor}
          aria-label={`${Math.round(percentage)} %`}
        />
      </CardFooter>
    </Card>
  );
}
