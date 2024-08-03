import axios from 'axios';

export const URL = import.meta.env.VITE_API_URL;

export async function getStats(route) {
  try {
    const res = await axios.get(`${URL}${route}`);
    return res.data;
  } catch (err) {
    if (err.response) {
      if (err.response.status === 429) {
        throw new Error('YouTube API Quota exceeded');
      }
    }
    throw new Error('Unexpected error occured');
  }
}

export async function getTaskId(route) {
  const res = await axios.get(`${URL}${route}`);
  return res.data;
}

export async function pollTask(taskId) {
  const pollInterval = 1000;
  const maxAttempts = 15;
  let attempts = 0;
  try {
    while (attempts < maxAttempts) {
      const response = await axios.get(`${URL}/check/${taskId}`);
      const taskStatus = response.data.state;
      if (taskStatus === 'SUCCESS') {
        return response.data.result;
      } else if (taskStatus === 'FAILED') {
        console.error('Task failed');
        return response.data;
      }

      attempts++;
      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }
  } catch (error) {
    console.error('An error occurred while polling the task status', error);
    throw error;
  }
}

export async function getSentiments(route) {
  try {
    const res = await axios.get(`${URL}${route}`);
    if (res.data.state === 'SUCCESS') {
      return res.data.result;
    }
    const result = await pollTask(res.data.id);
    return result;
  } catch (err) {
    if (err.response) {
      if (err.response.status === 429) {
        throw new Error('YouTube API Quota exceeded');
      }
    }
    throw new Error('Unexpected error occured');
  }
}
