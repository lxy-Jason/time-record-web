<template>
  <div class="study">
    <!-- Study -->
    <Circle size="19.5rem" layer-color="#ddd" class="circle">
      <div class="circleText">
        <p>本周学习时间</p>
        <p style="text-align: center">{{ totalTime }}</p>
      </div>
    </Circle>
    <div class="text">
      <p>本次学习时间</p>
      <p style="text-align: center">{{ curTime }}</p>
    </div>
    <div class="button">
      <Button
        v-if="startFlag"
        plain
        @click="startLearn"
        type="primary"
        color="#246EEA"
        >开始</Button
      >
      <Button
        v-if="!startFlag"
        @click="pauseTime"
        plain
        type="primary"
        color="#EA1E10"
        >暂停</Button
      >
      <Button type="primary" color="#FF8258" @click="saveTime">结束</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { timeUploadApi, getWeekApi } from "@/utils/request/api";
import { Notify, Circle, Button, Dialog } from "vant";
import "vant/es/notify/style";
import { timeFormat } from "@/utils/timeFormat";
import { timeDiff } from "@/utils/timeDiff";
import { getTotalTime } from "@/utils/getTotalTime";

let totalTime = ref("00:00:00");
let seconds = ref(0);
let minutes = ref(0);
let hours = ref(0);
let startFlag = ref(true);
let timer: any;
let setTimer:any;

//计时器(后期优化动画)
const timeCount = async() => {
  if (startFlag.value) {
    return;
  }
  let studyTime = Number(localStorage.getItem("studyTime"))
  setTimer = setTimeout(()=>{seconds.value++;clearTimeout(setTimer)},(Math.ceil(studyTime/1000)-(studyTime/1000))*1000);
  timer = setInterval(() => {
    seconds.value++;
    if (seconds.value >= 60) {
      seconds.value = 0;
      minutes.value++;
    }
    if (minutes.value >= 60) {
      minutes.value = 0;
      hours.value++;
    }
  }, 1000);
};
//开始学习
const startLearn = () => {
  let startTime = new Date().getTime();
  startFlag.value = false;
  timeCount();
  localStorage.setItem("startFlag", "false");
  localStorage.setItem(
    "startTime",
    localStorage.getItem("startTime") || startTime.toString()
  );
  localStorage.setItem("lastPause", startTime.toString());
  localStorage.setItem("studyTime", localStorage.getItem("studyTime") || "0");
};

//暂停计时
const pauseTime = () => {
  clearInterval(timer);
  clearTimeout(setTimer);
  let temppause = new Date().getTime();
  let studyTime =
    Number(localStorage.getItem("studyTime")) +
    (temppause - Number(localStorage.getItem("lastPause")));
  localStorage.setItem("studyTime", studyTime.toString());
  localStorage.setItem("startFlag", "true");
  startFlag.value = !startFlag.value;
};
//重置时间
const reset = () => {
  clearInterval(timer);
  startFlag.value = true;
  seconds.value = 0;
  minutes.value = 0;
  hours.value = 0;
  localStorage.removeItem("startFlag");
  localStorage.removeItem("startTime");
  localStorage.removeItem("studyTime");
  localStorage.removeItem("lastPause");
};
//结束学习,保存时间
const saveTime = async () => {
  let startTime = Number(localStorage.getItem("startTime"));
  let timeStamp = Number(localStorage.getItem("studyTime"));
  let endTime = timeStamp + startTime;
  let data = {
    username: "zhangsan3",
    time: getTimeDiff(),
    startTime,
    endTime,
    timeStamp,
  };
  if (!hours.value && !minutes.value) {
    Notify({ type: "warning", message: "不足一分钟,不上传" });
  } else {
    timeUpload(data);
  }
  reset();
};
// 获取当前时间与开始时间的差值
const getTimeDiff = () => {
  // let start = Number(localStorage.getItem("startTime")) || new Date().getTime();
  // let end =
  //   (Number(localStorage.getItem("studyTime")) || new Date().getTime()) + start;
  let studyTime = Number(localStorage.getItem("studyTime"));
  return getTotalTime(studyTime);
};
//todo从后端获取当前已完成的时长
const getWeekTime = async () => {
  const res = await getWeekApi();
  const { data } = res.data;
  let temp = data.time.split(":");
  let second = Number(temp.pop());
  let minute = Number(temp.pop());
  let hour = Number(temp.pop());
  totalTime.value = timeFormat(hour, minute, second);
};
// 时间上传
const timeUpload = async (data: object) => {
  const { data: res } = await timeUploadApi(data);
  // const { data } = res.data;
  if (res.code === 200 && res.msg !== "error") {
    Notify({ type: "success", message: res.msg });
    // 上传成功后重新获取总时长
    getWeekTime();
  } else {
    Notify({ type: "warning", message: res.msg });
  }
};
//页面可见时刷新页面
const updatePage = () => {
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState == "visible") {
      // location.reload(true);
      // instance.proxy.$forceUpdate();
      curTime.value = getTimeDiff() || "00:00:00";
    }
  });
};
//初始化
const init = () => {
  getWeekTime();
  if (localStorage.getItem("startFlag") === "true") {
    curTime.value = getTimeDiff() || "00:00:00";
    timeCount();
  } else {
    let nowTime = new Date().getTime();
    let studyTime =
      nowTime -
      Number(localStorage.getItem("lastPause")) +
      Number(localStorage.getItem("studyTime"));
    curTime.value = getTotalTime(studyTime);
    startFlag.value = false;
    timeCount();
  }
};

onMounted(() => {
  init();
});

//当前学习时长
let curTime = computed({
  get: () => timeFormat(hours.value, minutes.value, seconds.value),
  set: (val: string) => {
    let temp = val.split(":");
    seconds.value = Number(temp.pop());
    minutes.value = Number(temp.pop());
    hours.value = Number(temp.pop());
  },
});
</script>

<style scoped>
.study {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 50px);
  /* --van-circle-text-font-size: 1.56rem; */
  position: relative;
}
.circleText {
  font-weight: 500;
  font-size: 1.56rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 40px;
}
.text {
  margin: 3rem auto 5rem auto;
  font-size: 1.38rem;
  line-height: 32px;
}
.button {
  width: 15rem;
  text-align: center;
  display: flex;
  justify-content: space-around;
  --van-button-normal-padding: 1rem 1.5rem;
  --van-button-normal-font-size: 1.25rem;
}
</style>
