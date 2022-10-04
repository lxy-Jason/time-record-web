export default (timeStamp: number) => {
  return Math.floor((timeStamp / (1000 * 3600)) * 10) / 10;
};
