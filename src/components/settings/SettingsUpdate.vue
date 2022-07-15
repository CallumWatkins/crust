<script lang="ts">
export default {
  name: "SettingsUpdate",
}
</script>

<script setup lang="ts">
import { app, updater, process } from '@tauri-apps/api';
import { ref } from 'vue';
import type { Ref } from 'vue';

enum UpdateState {
  Unchecked,
  UpdateAvailable,
  UpToDate,
  Updating,
  Updated,
  Relaunching,
}

const appVersion = await app.getVersion();

const availableUpdateManifest: Ref<updater.UpdateManifest | undefined> = ref(undefined);

const updateState = ref(UpdateState.Unchecked);

async function checkForUpdates() {
  const { shouldUpdate, manifest } = await updater.checkUpdate();
  if (shouldUpdate) {
    availableUpdateManifest.value = manifest;
    updateState.value = UpdateState.UpdateAvailable;
  } else {
    updateState.value = UpdateState.UpToDate;
  }
}

async function update() {
  updateState.value = UpdateState.Updating;
  await updater.installUpdate();
  updateState.value = UpdateState.Updated;
}

async function relaunch() {
  updateState.value = UpdateState.Relaunching;
  await process.relaunch();
}
</script>

<template>
  <div>
    <div class="block">
      <p>App version: {{ appVersion }}</p>
      <div class="has-text-success has-text-weight-bold mt-2">
        <p v-if="updateState === UpdateState.UpdateAvailable">New version available: {{ availableUpdateManifest!.version }} ({{ availableUpdateManifest!.date }})</p>
        <p v-else-if="updateState === UpdateState.UpToDate">App is up to date</p>
        <p v-else-if="updateState === UpdateState.Updating">Updating...</p>
        <p v-else-if="updateState === UpdateState.Updated">Update complete, relaunch now?</p>
      </div>
    </div>
    <div class="block">
      <button v-if="updateState === UpdateState.Unchecked || updateState === UpdateState.UpToDate" class="button" @click="checkForUpdates">Check for updates</button>
      <button v-else-if="updateState === UpdateState.UpdateAvailable" class="button" @click="update">Update now</button>
      <button v-else-if="updateState === UpdateState.Updating" class="button is-loading">Update now</button>
      <button v-else-if="updateState === UpdateState.Updated" class="button is-success" @click="relaunch">Relaunch</button>
      <button v-else-if="updateState === UpdateState.Relaunching" class="button is-success is-loading">Relaunch</button>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
