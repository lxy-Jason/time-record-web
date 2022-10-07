import { getTotalTime } from "./getTotalTime";

export const timeDiff = (start: number, end: number) => {
  const diff = end - start;
  return getTotalTime(diff);
};
