export interface LoginInfo {
  username: string;
  password: string;
}

export interface AllUserWeekResponseData {
  username: string;
  time: string;
  totalTimeStampTemp: number;
}

export interface AllUserWeekResponse {
  code: number;
  data: AllUserWeekResponseData[];
}
