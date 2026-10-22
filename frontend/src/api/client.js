import axios from 'axios';
import { auth } from '../firebase/config';

const client = axios.create({
  baseURL: import.meta.env.VITE_GATEWAY_URL || 'http://localhost:5000/api'
});

client.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // token expired or invalid — force refresh next request
    }
    return Promise.reject(err);
  }
);

export default client;