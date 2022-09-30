<script setup lang="ts">
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div
    class="flex h-screen flex-col items-center justify-center dark:bg-slate-800 dark:text-white"
  >
    <div>
      <router-link to="/">home</router-link>
      <router-link to="/about">about</router-link>
    </div>
    <router-view />
    <Footer />
  </div>
</template>
