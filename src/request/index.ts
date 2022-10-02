import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.aiwan.run/",
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
  return config;
});
instance.interceptors.response.use((value) => {
  return value.data;
});
export default instance;
