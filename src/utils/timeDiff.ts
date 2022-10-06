import {getTotalTime} from './getTotalTime'

export const timeDiff = (start:number, end:number) => {
  let diff = end - start
  return getTotalTime(diff)
}

