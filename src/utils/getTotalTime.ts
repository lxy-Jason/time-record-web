<<<<<<< HEAD
import { timeFormat } from "./timeFormat"

export const getTotalTime = (timeStamp:number) => {
  var hours = Math.floor(timeStamp / (3600 * 1000))
  //计算相差分钟数 
  var leave2 = timeStamp % (3600 * 1000)    //计算小时数后剩余的毫秒数 
  var minutes = Math.floor(leave2 / (60 * 1000))
  //计算相差秒数 
  var leave3 = leave2 % (60 * 1000)   //计算分钟数后剩余的毫秒数 
  var seconds = Math.floor(leave3 / 1000)
  return timeFormat(hours,minutes,seconds)
}
=======
import timeFormat from "./timeFormat";
export const getTotalTime = (timeStamp: number) => {
  const hours = Math.floor(timeStamp / (3600 * 1000));
  //计算相差分钟数
  const leave2 = timeStamp % (3600 * 1000); //计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000));
  //计算相差秒数
  const leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000);
  return timeFormat(hours, minutes, seconds);
};
>>>>>>> aadd9ad62438a7f72b62c06a906caa1e3b0b048e
