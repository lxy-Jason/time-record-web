<template>
  <div class="study h-full bg-white" v-loading="loading">
    <!-- Study -->
    <Circle
      size="19.5rem"
      layer-color="#ddd"
      class="circle"
      v-model:current-rate="currentRate"
      speed="100"
      :rate="Rate"
      :color="gradientColor"
    >
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
      <!-- <Button v-if="startFlag">开始学习</Button> -->
      <Button
        v-if="startFlag"
        @click="startLearn"
        type="primary"
        color="#246EEA"
        >开始学习</Button
      >
      <Button v-if="!startFlag" @click="pauseTime" type="warning">{{
        pause ? "继续" : "暂停"
      }}</Button>
      <Button v-if="!startFlag" type="danger" plain @click="saveTime"
        >结束</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { timeUploadApi, getWeekApi } from "@/request/api";
import { Notify, Circle, Button, Dialog } from "vant";
import timeFormat from "@/utils/timeFormat";
import { useUserDetail } from "@/store/index";
import { timeDiff } from "@/utils/timeDiff";

const userDetail = useUserDetail();
let totalTime = ref("00:00:00");
let seconds = ref(0);
let minutes = ref(0);
let hours = ref(0);
let startFlag = ref(true);
let timer: number;
let loading = ref(true);
let Rate = ref(0);
let currentRate = ref(0);
const gradientColor = { "0%": "#3fecff", "100%": "#6149f6" };
//计时器(后期优化动画)
const timeCount = () => {
  if (startFlag.value) {
    return;
  }
  timer = window.setInterval(() => {
    seconds.value++;
    if (seconds.value > 59) {
      seconds.value = 0;
      minutes.value++;
    }
    if (minutes.value > 59) {
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
  localStorage.setItem("startTime", startTime.toString());
};
const pause = ref(false);
//暂停计时
const pauseTime = () => {
  if (!pause.value) {
    let pauseStart = new Date().getTime();
    clearInterval(timer);
    //暂停开始
    localStorage.setItem("pauseStart", pauseStart.toString());
  } else {
    timeCount();
    let pauseEnd = new Date().getTime();
    let pauseTime =
      pauseEnd -
      Number(localStorage.getItem("pauseStart") as string) +
      Number(localStorage.getItem("pauseTime") || 0);
    localStorage.setItem("pauseTime", pauseTime.toString());
    localStorage.removeItem("pauseStart");
  }
  pause.value = !pause.value;
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
  localStorage.removeItem("pauseEnd");
  localStorage.removeItem("pauseStart");
  localStorage.removeItem("pauseTime");
};
const username = localStorage.getItem("username") || "Jason";
//获取结束时间
const getEndTime = () => {
  let endTime;
  //暂停时,结束时间就是暂停开始的时间
  if (localStorage.getItem("pauseStart")) {
    endTime = Number(localStorage.getItem("pauseStart"));
  } else {
    //正在计时就是现在
    endTime = new Date().getTime();
  }
  return endTime;
};
//结束计时逻辑
const finishTime = () => {
  clearInterval(timer);
  localStorage.setItem("startFlag", "true");
  let startTime = Number(localStorage.getItem("startTime"));
  let endTime = getEndTime();
  let pauseTime = Number(localStorage.getItem("pauseTime")) || 0;
  let timeStamp = endTime - startTime - pauseTime;
  let data = {
    username,
    time: getTimeDiff(),
    startTime: startTime,
    endTime: endTime,
    timeStamp: timeStamp,
  };
  if (!hours.value && !minutes.value) {
    Notify({ type: "warning", message: "不足一分钟,不上传" });
  } else {
    timeUpload(data);
  }
};
//结束学习,保存时间
const saveTime = () => {
  Dialog.confirm({
    title: "标题",
    message: "是否上传本次学习时间?",
  })
    .then(() => {
      finishTime();
      reset();
    })
    .catch(() => {
      reset();
    });
};
// 获取当前时间与开始时间的差值
const getTimeDiff = () => {
  let end = getEndTime();
  let start = Number(localStorage.getItem("startTime")) || new Date().getTime();
  let pause = Number(localStorage.getItem("pauseTime") || 0);
  return timeDiff(start, end, pause);
};
//todo从后端获取当前已完成的时长
const getWeekTime = async () => {
  loading.value = true;
  const res = await getWeekApi(username);
  console.log(res);
  loading.value = false;
  const { time } = res;
  let temp = time.split(":");
  let second = Number(temp.pop());
  let minute = Number(temp.pop());
  let hour = Number(temp.pop());
  //每次读取每周学习时间的时候都会自动触发动画
  Rate.value = ((hour * 3600 + minute * 60 + second) / (20 * 3600)) * 100;
  totalTime.value = timeFormat(hour, minute, second);
};
// 时间上传
const timeUpload = async (data: object) => {
  const res = await timeUploadApi(data);
  console.log(res);
  if (res.code === 200) {
    Notify({ type: "success", message: "时间上传成功" });
    // 上传成功后重新获取总时长
    getWeekTime();
    userDetail.getUserWeek();
  } else {
    Notify({ type: "warning", message: "时间上传失败" });
  }
};

//页面可见时刷新页面
const updatePage = () => {
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState == "visible") {
      curTime.value = getTimeDiff() || "00:00:00";
    }
  });
};
//初始化
const init = () => {
  getWeekTime();
  startFlag.value = JSON.parse(localStorage.getItem("startFlag") || "true");
  updatePage();
  curTime.value = getTimeDiff() || "00:00:00";
  if (localStorage.getItem("pauseStart")) {
    pause.value = true;
  } else {
    timeCount();
  }
};

onMounted(() => {
  init();
  updatePage();
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
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 1rem;
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
