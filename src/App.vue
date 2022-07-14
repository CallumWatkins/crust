<script setup lang="ts">
import { ref } from 'vue';

enum Theme {
  Light = "LIGHT",
  Dark = "DARK",
}

const theme = ref(Theme.Dark);
</script>

<template>
  <div id="root" :class="theme.toLowerCase()">
    <RouterView />
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/styles.scss";
</style>
