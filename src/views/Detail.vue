<template>
  <div class="relative mx-1 bg-white p-2" v-loading="loading">
    <div class="back" v-if="showBack" @click="back2pank">
      <img src="@/assets/fanhui.svg" />
    </div>
    <User
      :username="userData.username"
      :time="userData.time"
      :index="userData.rank"
    ></User>
    <v-chart class="charts" :option="option" />
    <v-chart class="charts" :option="dayOption" />
  </div>
</template>

<script setup lang="ts">
import User from "@/components/user.vue";
import { useRouter } from "vue-router";
import { ref, watchEffect, Ref, onMounted } from "vue";
import { getUserTodayApi, getUserWeekApi } from "@/request/api";
import getMinute from "@/utils/getHour";
import VChart from "vue-echarts";
import "echarts";
import { useShowBack, useUserDetail } from "@/store";
import { storeToRefs } from "pinia";

const ShowBack = useShowBack();
const UserDetail = useUserDetail();
let { showBack } = storeToRefs(ShowBack);
let { userDetail } = storeToRefs(UserDetail);
const router = useRouter();
const back2pank = () => {
  router.push({ path: "ranking" });
};
const loading = ref(true);
let loadingWeek = ref(false);
let loadingDay = ref(false);
//获取本周数据
const getWeekTime = async () => {
  loading.value = true;
  loadingWeek.value = false;
  const res = await getUserWeekApi(userDetail.value.username);
  if (res.code === 200) {
    option.value.series[0].data[0].value = res.data.map((item) => {
      return getMinute(item.totalTimeStamp) || 0;
    });
  }
  loadingWeek.value = true;
};
//获取当天数据
const getTodayTime = async () => {
  loading.value = true;
  loadingDay.value = false;
  const res = await getUserTodayApi(userDetail.value.username);
  if (res.code === 200) {
    dayOption.value.series[0].data = res.data.map(
      (item: { time: string | undefined }) => {
        return Number(item.time || 0);
      }
    );
  }
  loadingDay.value = true;
};
const option = ref({
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
          value: [] as number[],
          label: {
            //显示value中具体的数值
            show: true,
          },
          emphasis: {
            label: {
              show: true,
              color: "#fff",
              fontSize: 32,
              formatter: "{c}h", // 鼠标悬浮时展示数据加上单位
              backgroundColor: "#0D1B42",
              borderRadius: 5,
              padding: 3,
              shadowBlur: 3,
            },
          },
        },
      ],
    },
  ],
});
const dayOption = ref({
  title: {
    text: "今天学习时长",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
    },
  },

  grid: {
    left: 50, // 调整这个属性
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
      data: [],
      markArea: {
        itemStyle: {
          color: "rgba(255, 173, 177, 0.4)",
        },
      },
    },
  ],
});
type UserData = {
  username: string;
  time: string;
  rank: number;
};
let userData: Ref<UserData> = ref({
  username: "",
  time: "00:00:00",
  rank: 0,
});
watchEffect(() => {
  getWeekTime();
  getTodayTime();
  userData.value = userDetail.value;
});
watchEffect(() => {
  if (loadingDay.value && loadingWeek.value) {
    loading.value = false;
  }
});
onMounted(() => {
  getWeekTime();
  getTodayTime();
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
