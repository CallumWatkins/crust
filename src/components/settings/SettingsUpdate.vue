<script setup lang="ts">
import { app, updater } from '@tauri-apps/api';

const appVersion = await app.getVersion();
</script>

<template>
  <div>
    <div class="block">
      <p>App version: {{ appVersion }}</p>
      <b class="has-text-success">New version available: {{ appVersion }}</b>
    </div>
    <div class="block">
      <button class="button">Check for updates</button>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
