import request from "./index";

//登录
export const loginApi = (data: object) => request.post("user/login", data);
//获取本周用户数据
export const getUserWeekApi = (username: string) =>
  request.get<unknown, { code: number; data: { totalTimeStamp: number }[] }>(
    `/time/getUserWeek?username=${username}`
  );
//获取所有用户本周学习总时长
export const getAllUserWeekApi = () =>
  request.get<unknown, { code: number; data: [] }>("time/getAllUserWeekTime");

//获取用户当天数据
export const getUserTodayApi = (username: string) =>
  request.get(`time/getUserTodayInterval?username=${username}`);