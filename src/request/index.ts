/*
 * @Author: xiangyue_li
 * @Date: 2023-08-27 15:31:38
 * @LastEditors: xiangyue_li
 */
import axios from "axios";
import { Get, Post } from "@/types";

const instance = axios.create({
  // baseURL: "https://api.aiwan.run/",
  // baseURL: "http://localhost:3000/",
  baseURL: "http://124.220.59.240:3334/",
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
instance.interceptors.request.use((config) => {
  return config;
});
instance.interceptors.response.use((value) => {
  // console.log(value);

  return value.data;
});
const request = { get, post };
export default request;
