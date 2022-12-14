import { AxiosRequestConfig, CustomSuccessData } from "axios";
import type { InjectionKey } from "vue";

export interface LoginInfo {
  username: string;
  password: string;
}

export interface AllUserWeekResponseData {
  code: number;
  msg: string;
  usersArr: [{ _id: string; totalWeekTime: number }];
}

export interface AllUserWeekResponse {
  code: number;
  data: AllUserWeekResponseData[];
}

export interface loginRes {
  code: number;
  msg: string;
  token: string;
  username: string;
}

export interface UserData {
  username: string;
  time: string;
  rank: number;
  portrait: string;
}
// 泛型接口
export interface Get {
  <T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<
    CustomSuccessData<T>
  >;
}
export interface Post {
  <T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<
    CustomSuccessData<T>
  >;
}

export const close = Symbol() as InjectionKey<() => void>;
