import request from "./index";
import { loginRes, UserData } from "@/types";

//登录
export const loginApi = (data: object) =>
  request.post<loginRes>("users/login", data);

//注册
export const registerApi = (data: object) =>
  request.post("users/register", data);

//获取用户本周时长分布
export const getUserEverydayTimeApi = (username: string) =>
  request.get(`time/getUserEverydayTime?username=${username}`);

//获取所有用户本周学习总时长
export const getAllUserWeekTime = () => request.get("time/getAllUserWeekTime");

//获取所有用户本月学习时间
export const getAllUserMonthTime = () =>
  request.get("/time/getAllUserMonthTime");

//获取所有用户总时长
export const getAllUserTotalTime = () => request.get("/time/getTotalTime");

//获取用户当天时长分布
export const getUserTodayTimeApi = (username: string) =>
  request.get(`time/getUserTodayTime?username=${username}`);

//获取用户总本周时长
export const getWeekApi = (data: string) =>
  request.get<UserData>(`time/getWeek?username=${data}`);

//上传用户学习时长
export const timeUploadApi = (data: object) =>
  request.post("time/upload", data);

//更新头像
const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    username: localStorage.getItem("username") as string,
  },
};
export const uploadPortrait = (file: object | undefined) =>
  request.post("upload/portrait", file, config);
