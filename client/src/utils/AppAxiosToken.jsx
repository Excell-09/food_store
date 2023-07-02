import axios from "axios";

const appAxiosToken = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

appAxiosToken.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localStorage.getItem("token") || null;
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default appAxiosToken;
