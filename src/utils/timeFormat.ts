<<<<<<< HEAD
export const timeFormat = (hour = 0,minute = 0,second = 0) => {
  return `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
}
=======
export default (hour = 0, minute = 0, second = 0) => {
  return `${hour < 10 ? "0" + hour : hour}:${
    minute < 10 ? "0" + minute : minute
  }:${second < 10 ? "0" + second : second}`;
};
>>>>>>> aadd9ad62438a7f72b62c06a906caa1e3b0b048e
