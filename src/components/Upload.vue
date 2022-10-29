<template>
  <div class="upload">
    <p>修改头像</p>
    <van-uploader
      :after-read="afterRead"
      multiple
      v-model="fileList"
      :max-count="1"
      preview-size="10rem"
      :preview-full-image="false"
      accept="image/*"
    />
    <el-button type="primary" plain @click="upload">确认修改</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { uploadPortrait } from "@/request/api";
import { Notify } from "vant";
import "vant/es/notify/style";
import { useUserDetail } from "@/store";
import { close } from "@/types";

const fileList = ref([]);
const img = ref();
const afterRead = (file: any) => {
  //得到图片文件
  img.value = file.file;
};

const isShow = inject(close) as () => void;
const userDetail = useUserDetail();

const upload = async () => {
  let imgFile = new FormData(); // 创建form对象
  imgFile.append("imgFile", img.value); // 通过append向form对象添加数据
  console.log(imgFile);
  const res = await uploadPortrait(imgFile);
  console.log(res);
  if (res.code === 200) {
    Notify({ type: "success", message: "修改头像成功" });
    isShow();
    userDetail.getUserWeek();
  } else {
    Notify({ type: "warning", message: "修改头像失败" });
  }
};
</script>

<style scoped>
.upload {
  padding: 1rem;
  height: 20rem;
  width: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
}
</style>
