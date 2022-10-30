import { getTotalTime } from "./getTotalTime";

export const timeDiff = (start: number, end: number, pause: number) => {
  const diff = end - start - pause;
  return getTotalTime(diff);
};
