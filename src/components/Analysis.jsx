import AnalysisCard from '@/components/AnalysisCard';
import AnalysisChart from '@/components/AnalysisChart';
import { getSentiments } from '@/lib/requests';
import useSWRImmutable from 'swr/immutable';
import AnalysisLoader from './AnalysisLoader';
import ErrorBlock from './ErrorBlock';

export default function Analysis({ videoTitle, videoId }) {
  const {
    data: videoDetail,
    isLoading,
    error,
  } = useSWRImmutable(`/sentiments/${videoId}`, getSentiments);

  return (
    <>
      {!isLoading && !error && videoDetail ? (
        <div className='grid grid-cols-1 lg:grid-rows-2 lg:grid-cols-[2fr,1fr,1fr] lg:gap-x-4 lg:gap-y-0 gap-4 lg:max-w-[none] max-w-[500px] mx-auto lg:mx-0'>
          <div className='lg:row-span-3 lg:col-span-1 '>
            <AnalysisChart
              reactions={videoDetail.sentimentCounts}
              videoTitle={videoTitle}
            />
          </div>
          <AnalysisCard
            className='lg:col-span-2 lg:mb-4'
            title='Positive Feedback'
            percentage={videoDetail.positivePercentage}
            description='Video was loved by the viewers'
            indicatorColor='dark:bg-[#81C784] bg-[#4CAF50]'
          />
          <AnalysisCard
            title='Neutral Feedback'
            percentage={videoDetail.neutralPercentage}
            description='Neutral response to the video'
            indicatorColor='dark:bg-[#78909C] bg-[#9E9E9E]'
          />
          <AnalysisCard
            title='Negative Feedback'
            percentage={videoDetail.negativePercentage}
            indicatorColor='dark:bg-[#E57373] bg-[#F44336]'
            description='Video was not received well'
          />
        </div>
      ) : (
        <div className='h-80 flex items-center justify-center'>
          {error && !isLoading && <ErrorBlock message={error.message} />}
          {isLoading && <AnalysisLoader interval={2500} />}
        </div>
      )}
    </>
  );
}
