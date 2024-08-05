import { columns } from '@/components/table/columns';
import useSWRImmutable from 'swr/immutable';
import DataTable from '@/components/table/DataTable';
import { getStats } from '@/lib/requests';
import ChannelDetails from '@/components/ChannelDetails';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useTable from '@/lib/hooks/useTable';
import ColumnSelector from '@/components/table/ColumnSelector';
import { useEffect, useMemo, useState } from 'react';
import TopStats from '@/components/TopCharts';
import Analysis from '../components/Analysis';
import AnalysisInput from '@/components/AnalysisInput';
import ErrorBlock from '@/components/ErrorBlock';
import Landing from '@/components/Landing';

export default function Home({
  channelId,
  value,
  setValue,
  inputRef,
  setIsHidden,
}) {
  const { data, isLoading, error } = useSWRImmutable(
    channelId ? `/channel-details/${channelId}` : null,
    getStats
  );
  const channelDetails = !isLoading &&
    data && {
      channelTitle: data.channelTitle,
      channelDescription: data.channelDescription,
      thumbnail: data.thumbnail,
      viewCount: data.viewCount,
      subscriberCount: data.subscriberCount,
      videoCount: data.videoCount,
      customUrl: data.customUrl,
      maxViews: data.maxViews,
      maxComments: data.maxComments,
      maxLikes: data.maxLikes,
    };
  const [videoTitle, setVideoTitle] = useState('');
  const [videoId, setVideoId] = useState('');

  useEffect(() => {
    if (!isLoading && data) {
      const video = data.videoDetails.find(video => video.comments !== 0);
      setVideoId(video.id);
      setVideoTitle(video.title);
    }
  }, [isLoading, data]);

  const onSearching = (vId, vTitle) => {
    setVideoId(vId);
    setVideoTitle(vTitle);
    setValue('sentiment');
  };
  const { table } = useTable({
    data: data?.videoDetails || [],
    columns,
    onSearching,
  });

  const filteredVideos = useMemo(() => {
    if (!data?.videoDetails) return [];
    return data.videoDetails.filter(video => video.comments !== 0);
  }, [data]);

  return (
    <div className='max-w-[1200px] mx-auto sm:p-5 p-3'>
      {!isLoading && !error && data ? (
        <>
          <ChannelDetails details={channelDetails} />
          <div>
            <Tabs value={value} onValueChange={value => setValue(value)}>
              <div className='flex flex-col justify-between md:flex-row gap-4 items-stretch mb-4 mt-8'>
                <TabsList>
                  <TabsTrigger value='table'>Statistics</TabsTrigger>
                  <TabsTrigger value='top'>Top Charts</TabsTrigger>
                  <TabsTrigger value='sentiment'>Sentiments</TabsTrigger>
                </TabsList>
                {value === 'table' && <ColumnSelector table={table} />}
                {value === 'sentiment' && (
                  <AnalysisInput data={filteredVideos} search={onSearching} />
                )}
              </div>
              <TabsContent value='table'>
                <DataTable
                  columns={columns}
                  table={table}
                  isLoading={isLoading}
                />
              </TabsContent>
              <TabsContent value='top'>
                <TopStats
                  details={channelDetails}
                  chartData={data.videoDetails.slice(0, 80)}
                />
              </TabsContent>
              <TabsContent value='sentiment'>
                <Analysis
                  data={data.videoDetails}
                  videoTitle={videoTitle}
                  videoId={videoId}
                />
              </TabsContent>
            </Tabs>
          </div>
        </>
      ) : (
        <div className='flex items-center justify-center'>
          {error && <ErrorBlock message={error.message} />}
          {isLoading && !error && (
            <div className='min-h-[50vh] flex justify-center items-center flex-col'>
              <div className='loader mb-4'></div>
              <p>Analyzing channel...</p>
            </div>
          )}
          {!isLoading && !error && (
            <Landing inputRef={inputRef} setIsHidden={setIsHidden} />
          )}
        </div>
      )}
    </div>
  );
}
