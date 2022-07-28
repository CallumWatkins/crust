<script setup lang="ts">
import { invoke } from '@tauri-apps/api/tauri';

let is_first_resolve = true;

async function first_resolve() {
  if (is_first_resolve) {
    is_first_resolve = false;
    await new Promise((r) => { setTimeout(r, 500); });
    invoke('close_splashscreen');
  }
}
</script>

<template>
  <Suspense @resolve="first_resolve">
    <RouterView />
  </Suspense>
</template>

<style lang="scss">
@import "@/assets/styles/styles";
</style>
