<template>
  <div class="relative mx-1">
    <div class="back" @click="back2pank">
      <img src="@/assets/fanhui.svg" />
    </div>
    <User></User>
    <div ref="weekTime" class="charts"></div>
    <div ref="dayTime" class="charts"></div>
  </div>
</template>

<script setup lang="ts">
import User from "@/components/user.vue";
import { useRouter } from "vue-router";
import { ref, nextTick, onUnmounted } from "vue";
import * as echarts from "echarts";
const router = useRouter();

const back2pank = () => {
  router.push({ path: "ranking" });
};
const weekTime = ref();
const dayTime = ref();
// 基于准备好的dom，初始化echarts实例
nextTick(() => {
  let weekChart = echarts.init(weekTime.value);

  // 绘制图表
  weekChart.setOption({
    title: {
      text: "本周学习时间",
    },
    radar: {
      indicator: [
        { name: "周一" },
        { name: "周二" },
        { name: "周三" },
        { name: "周四" },
        { name: "周五" },
        { name: "周六" },
        { name: "周日" },
      ],
    },
    series: [
      {
        type: "radar",
        data: [
          {
            value: [6, 3, 4, 3, 4, 2],
          },
        ],
      },
    ],
  });
  let dayChart = echarts.init(dayTime.value);
  dayChart.setOption({
    title: {
      text: "今天学习时长",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      // prettier-ignore
      data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'],
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} m",
      },
      axisPointer: {
        snap: true,
      },
    },
    series: [
      {
        name: "todayTime",
        type: "line",
        smooth: true,
        // prettier-ignore
        data: [93, 60, 90, 120,0,0, 150, 180, ],
        markArea: {
          itemStyle: {
            color: "rgba(255, 173, 177, 0.4)",
          },
        },
      },
    ],
  });
  window.onresize = function () {
    weekChart.resize();
    dayChart.resize();
  };
});
onUnmounted(() => {
  window.onresize = null;
});
</script>

<style scoped>
@tailwind components;
.back {
  @apply w-8 h-10 p-2 absolute top-8 left-5 bg-white;
}
.charts {
  @apply flex justify-center items-center;
  width: 100%;
  height: 400px;
}
</style>
