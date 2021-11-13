import axios from "axios";

export const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 100000,
});

request.interceptors.request.use((config) => {
  config.params = {
    api_key: process.env.REACT_APP_MOVIE_KEY,
  };

  return config;
});
