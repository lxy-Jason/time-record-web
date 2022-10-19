import axios from "axios";
import { Get, Post } from "@/types";

const instance = axios.create({
  // baseURL: "https://api.aiwan.run/",
  // baseURL: "/api",
  baseURL: "http://localhost:3000/",
  timeout: 5000,
});
// 封装 get 方法，类型为Get
const get: Get = async (url, params, config) => {
  const response = await instance.get(url, { params, ...config });
  return response;
};
const post: Post = async (url, params, config) => {
  const response = await instance.post(url, params, { ...config });
  return response;
};
instance.interceptors.request.use((config: Record<string, any> | any) => {
  const token: string = window.localStorage.getItem("token") || "";
  config.headers.token = token;
  return config;
});
instance.interceptors.response.use((value) => {
  // console.log(value);
  if (
    value.config.url === "users/login" ||
    value.config.url === "users/register"
  ) {
    localStorage.setItem("token", value.headers.token);
  }
  return value.data;
});
const request = { get, post };
export default request;
