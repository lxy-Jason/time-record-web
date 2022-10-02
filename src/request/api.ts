import request from "./index";

//登录
export const loginApi = (data: object) => request.post("user/login", data);
//获取本周用户数据
export const getUserWeekApi = (data: string) =>
  request.get<unknown, { code: number; data: { totalTimeStamp: number }[] }>(
    `/time/getUserWeek?username=${data}`
  );
