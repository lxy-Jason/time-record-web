import request from "./index";
import { loginRes } from "@/types";

//登录
export const loginApi = (data: object) =>
  request.post<loginRes>("users/login", data);
//注册
export const registerApi = (data: object) =>
  request.post("users/register", data);
//获取本周用户数据
export const getUserWeekApi = (username: string) =>
  request.get(`time/getUserWeek?username=${username}`);
//获取所有用户本周学习总时长
export const getAllUserWeekTime = () => request.get("time/getAllUserWeekTime");
//获取所有用户本月学习时间
export const getAllUserMonthTime = () =>
  request.get("/time/getAllUserMonthTime");
//获取所有用户总时长
export const getAllUserTotalTime = () => request.get("/time/getTotalTime");
//获取用户当天数据
export const getUserTodayApi = (username: string) =>
  request.get(`time/getUserTodayInterval?username=${username}`);
interface UserData {
  username: string;
  time: string;
  rank: number;
}
//获取用户本周时长
export const getWeekApi = (data: string) =>
  request.get<UserData>(`time/getWeek?username=${data}`);

//上传用户学习时长
export const timeUploadApi = (data: object) =>
  request.post("time/upload", data);
