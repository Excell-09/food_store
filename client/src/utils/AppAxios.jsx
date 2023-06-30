import axios from "axios";

const appAxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default appAxios;
