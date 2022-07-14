<script setup lang="ts">
import { ref } from 'vue';
import WindowTitlebar from '@/components/WindowTitlebar.vue';

enum Theme {
  Light = "LIGHT",
  Dark = "DARK",
}

const theme = ref(Theme.Dark);
</script>

<template>
  <div id="root" class="is-flex is-flex-direction-column" :class="theme.toLowerCase()">
    <div class="is-flex-shrink-0">
      <WindowTitlebar @toggle-theme="theme = (theme === Theme.Dark ? Theme.Light : Theme.Dark)" />
    </div>
    <div class="is-flex-grow-1">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/styles.scss";
</style>
