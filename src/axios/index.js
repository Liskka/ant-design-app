import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
    };
    return config;
  }
);

export default instance;
