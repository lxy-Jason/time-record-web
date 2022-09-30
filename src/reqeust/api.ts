import request from "./index";

//登录
export const loginApi = (data: object) => request.post("user/login", data);
