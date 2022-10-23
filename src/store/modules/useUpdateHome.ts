import { defineStore } from "pinia";

const useUpdateHome = defineStore("update", {
  state: () => {
    return {
      value: false,
    };
  },
  actions: {
    change() {
      this.value = !this.value;
    },
  },
});
export default useUpdateHome;
