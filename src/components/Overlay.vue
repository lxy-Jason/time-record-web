<template>
  <van-overlay :show="show" @click="close" lazy-render z-index="1000">
    <div class="wrapper" @click.stop>
      <Upload></Upload>
    </div>
  </van-overlay>
</template>

<script setup lang="ts">
import Upload from "@/components/Upload.vue";
defineProps({
  show: {
    type: Boolean,
    defualt: false,
  },
});
const emit = defineEmits(["show"]);
const close = () => {
  emit("show");
};
</script>

<style scoped>
.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  width: 20rem;
  height: 20rem;
}
</style>
