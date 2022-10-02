<template>
  <div class="relative mx-1" v-loading="loading">
    <div class="back" @click="back2pank">
      <img src="@/assets/fanhui.svg" />
    </div>
    <User></User>
    <v-chart class="charts" :option="option" />
    <div ref="dayTime" class="charts"></div>
  </div>
</template>

<script setup lang="ts">
import User from "@/components/user.vue";
import { useRouter } from "vue-router";
import { ref, nextTick, onUnmounted, onMounted } from "vue";
import * as echarts from "echarts";
import { getUserWeekApi } from "@/request/api";
import getMinute from "@/utils/getHour";
import VChart from "vue-echarts";

const router = useRouter();

const back2pank = () => {
  router.push({ path: "ranking" });
};
const loading = ref(true);
//获取本周数据
const getWeekTime = async () => {
  const res = await getUserWeekApi("zhangsan4");
  if (res.code === 200) {
    option.value.series[0].data[0].value = res.data.map((item) => {
      return getMinute(item.totalTimeStamp) || 0;
    });
  }
  loading.value = false;
};

const option = ref({
  title: {
    text: "本周学习时间",
  },
  radar: {
    indicator: [
      { name: "周一", max: 5 },
      { name: "周二", max: 5 },
      { name: "周三", max: 5 },
      { name: "周四", max: 5 },
      { name: "周五", max: 5 },
      { name: "周六", max: 5 },
      { name: "周日", max: 5 },
    ],
  },
  series: [
    {
      type: "radar",
      data: [
        {
          value: [] as number[],
        },
      ],
    },
  ],
});
const dayTime = ref();
// 基于准备好的dom，初始化echarts实例
nextTick(() => {
  let dayChart = echarts.init(dayTime.value);
  //日时长
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
    // weekChart.resize();
    dayChart.resize();
  };
});
onMounted(() => {
  getWeekTime();
}),
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
