import axios from 'axios';

export const URL = import.meta.env.VITE_API_URL;

export async function getStats(route) {
  if (route === '/channel-details/') return;
  const res = await axios.get(`${URL}${route}`);
  return res.data;
}

export async function getSentiments(route) {
  const res = await axios.get(`${URL}${route}`);
  return res.data;
}
