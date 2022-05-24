<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import store from '@/stores/index';
</script>

<template>
  <div :class='store.main.app().dark ? "dark" : ""'>
    <RouterView />
  </div>
</template>

<style>
@import '@/assets/tailwind.css';
</style>
