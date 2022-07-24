<script setup lang="ts">
import { app, clipboard, os } from '@tauri-apps/api';

const app_version = await app.getVersion();
const tauri_version = await app.getTauriVersion();
const os_arch = (await os.arch()).replace('x86_64', 'x64');
const os_platform = await os.platform();
const os_type = await os.type();
const os_version = await os.version();

async function copy_info() {
  await clipboard.writeText(`App Version: ${app_version}
Tauri Version: ${tauri_version}
OS Type: ${os_type}
OS Version: ${os_version}
OS Platform: ${os_platform}
OS Arch: ${os_arch}`);
}
</script>

<template>
  <div class="block">
    <b>App</b>
    <p>Version: {{ app_version }}</p>
    <p>Tauri Version: {{ tauri_version }}</p>
  </div>
  <div class="block">
    <b>OS</b>
    <p>Type: {{ os_type }}</p>
    <p>Version: {{ os_version }}</p>
    <p>Platform: {{ os_platform }}</p>
    <p>Arch: {{ os_arch }}</p>
  </div>
  <div class="block">
    <button
      class="button"
      @click="copy_info"
    >
      Copy to clipboard
    </button>
  </div>
</template>
