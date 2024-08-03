import { useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import { getCheck, getSentiments } from '../requests';
import useSWR from 'swr';

export default function usePolling(initialId) {
  const [taskId, setTaskId] = useState(null);
  const { data: initialData, error: initialError } = useSWRImmutable(
    `/sentiments/${initialId}`,
    getSentiments,
    {
      onSuccess: data => {
        if (data) {
          setTaskId(data);
        }
      },
    }
  );

  const { data, error } = useSWR(taskId ? `/check/${taskId}` : null, getCheck, {
    refreshInterval: data => (data && data.status === 'PENDING' ? 5000 : 0),
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    isLoading: !initialError && !initialData,
    isError: initialError || error,
  };
}
