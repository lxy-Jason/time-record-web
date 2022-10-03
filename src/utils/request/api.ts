import request from './index'

// //登录
// export const loginApi = (data) => request.post('users/login', data)
// // 注册
// export const registerApi = (data) => request.post('users/register', data)
//时间上传
export const timeUploadApi = (data:object) => request.post('time/upload',data)
//获取本周学习时间
export const getWeekApi = () => request.get(`time/getWeek?username=zhangsan3`)
//获取所用用户本周学习时间
// export const getAllUserWeekTime = () => request.get('/time/getAllUserWeekTime')
// //获取所有用户本月学习时间
// export const getAllUserMonthTime = () => request.get('/time/getAllUserMonthTime')
// //获取所有用户总时长
// export const getAllUserTotalTime = () => request.get('/time/getTotalTime')
// //修改用户名
// export const usernameupdate = (data) => request.post('/users/usernameUpdate',data)