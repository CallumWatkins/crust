<script setup lang="ts">
import { app, clipboard, os } from '@tauri-apps/api';

const appVersion = await app.getVersion();
const tauriVersion = await app.getTauriVersion();
const osArch = (await os.arch()).replace("x86_64", "x64");
const osPlatform = await os.platform();
const osType = await os.type();
const osVersion = await os.version();

async function copy_info() {
  await clipboard.writeText(`App Version: ${appVersion}
Tauri Version: ${tauriVersion}
OS Type: ${osType}
OS Version: ${osVersion}
OS Platform: ${osPlatform}
OS Arch: ${osArch}`);
}
</script>

<template>
  <div class="block">
    <b>App</b>
    <p>Version: {{ appVersion }}</p>
    <p>Tauri Version: {{ tauriVersion }}</p>
  </div>
  <div class="block">
    <b>OS</b>
    <p>Type: {{ osType }}</p>
    <p>Version: {{ osVersion }}</p>
    <p>Platform: {{ osPlatform }}</p>
    <p>Arch: {{ osArch }}</p>
  </div>
  <div class="block">
    <button class="button" @click="copy_info">Copy to clipboard</button>
  </div>
</template>

<style scoped lang="scss">

</style>
