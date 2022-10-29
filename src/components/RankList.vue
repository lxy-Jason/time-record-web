<template>
  <div class="list mb-14 overflow-y-auto">
    <User
      v-for="(item, index) in list"
      :key="index"
      :index="index + 1"
      :username="item.username"
      :time="item.time"
      :portrait="item.portrait"
    ></User>
    <van-empty v-if="isEmpty" description="本周还没有人学习" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, Ref } from "vue";
import { getTotalTime } from "@/utils/getTotalTime";
import {
  getAllUserWeekTime,
  getAllUserMonthTime,
  getAllUserTotalTime,
} from "@/request/api";
import User from "@/components/User.vue";
import { CustomSuccessData } from "axios";
import { useUserDetail } from "@/store/index";

const userDetail = useUserDetail();
const props = defineProps({
  active: {
    type: Number,
    defualt: 0,
  },
});
interface userInfo {
  username: string;
  time: string;
  portrait: string;
}
const list: Ref<userInfo[]> = ref([]);
const loading = ref(false);
const isEmpty = ref(true);
const apiArr = [getAllUserWeekTime, getAllUserMonthTime, getAllUserTotalTime];

//加载数据
const onLoad = async (api: {
  (): Promise<CustomSuccessData<unknown>>;
  (): Promise<CustomSuccessData<unknown>>;
  (): unknown;
}) => {
  // 异步更新数据
  let res = await api();
  console.log(res);

  if (res.code === 200) {
    // 加载状态结束
    let arr = res.usersArr.map(
      (item: { portrait: string; totalWeekTime: number; _id: unknown }) => {
        let time = getTotalTime(item.totalWeekTime);
        return { username: item._id, time, portrait: item.portrait };
      }
    );
    console.log(arr);
    list.value = arr;
    isEmpty.value = false;
  } else {
    console.log(res.err);
  }
  // 加载状态结束
  loading.value = false;
};

userDetail.$subscribe(() => {
  onLoad(apiArr[props.active || 0]);
});
onMounted(() => {
  onLoad(apiArr[props.active || 0]);
});
</script>

<style scoped>
.van-cell {
  text-align: center;
}
.list {
  min-height: 80vh;
  height: 50rem;
}
.van-row {
  line-height: 30px;
}
.time {
  font-family: Consolas, Monaco, monospace;
}
.index {
  font-size: 12px;
  color: #ccc;
}
.topThree {
  color: red;
  font-size: 16px;
  font-weight: bold;
}
</style>
