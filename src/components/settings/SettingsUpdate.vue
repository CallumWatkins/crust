<script setup lang="ts">
import { app, updater, process } from '@tauri-apps/api';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { None, Option, Some } from 'ts-results';

enum UpdateState {
  Unchecked,
  UpdateAvailable,
  UpToDate,
  Updating,
  Updated,
  Relaunching,
}

const app_version = await app.getVersion();

const available_update_manifest: Ref<Option<updater.UpdateManifest>> = ref(None);

const update_state = ref(UpdateState.Unchecked);

async function check_for_updates() {
  const { shouldUpdate, manifest } = await updater.checkUpdate();
  if (shouldUpdate) {
    if (manifest === undefined) {
      console.error('Update manifest is undefined');
      return;
    }
    available_update_manifest.value = Some(manifest);
    update_state.value = UpdateState.UpdateAvailable;
  } else {
    update_state.value = UpdateState.UpToDate;
  }
}

async function update() {
  update_state.value = UpdateState.Updating;
  await updater.installUpdate();
  update_state.value = UpdateState.Updated;
}

async function relaunch() {
  update_state.value = UpdateState.Relaunching;
  await process.relaunch();
}
</script>

<script lang="ts">
export default {
  name: 'SettingsUpdate',
};
</script>

<template>
  <div>
    <div class="block">
      <p>App version: {{ app_version }}</p>
      <div class="has-text-success has-text-weight-bold mt-2">
        <p v-if="update_state === UpdateState.UpdateAvailable">
          New version available: {{ available_update_manifest.unwrap().version }} ({{ available_update_manifest.unwrap().date }})
        </p>
        <p v-else-if="update_state === UpdateState.UpToDate">
          App is up to date
        </p>
        <p v-else-if="update_state === UpdateState.Updating">
          Updating...
        </p>
        <p v-else-if="update_state === UpdateState.Updated">
          Update complete, relaunch now?
        </p>
      </div>
    </div>
    <div class="block">
      <button
        v-if="update_state === UpdateState.Unchecked || update_state === UpdateState.UpToDate"
        class="button"
        @click="check_for_updates"
      >
        Check for updates
      </button>
      <button
        v-else-if="update_state === UpdateState.UpdateAvailable"
        class="button"
        @click="update"
      >
        Update now
      </button>
      <button
        v-else-if="update_state === UpdateState.Updating"
        class="button is-loading"
      >
        Update now
      </button>
      <button
        v-else-if="update_state === UpdateState.Updated"
        class="button is-success"
        @click="relaunch"
      >
        Relaunch
      </button>
      <button
        v-else-if="update_state === UpdateState.Relaunching"
        class="button is-success is-loading"
      >
        Relaunch
      </button>
    </div>
  </div>
</template>
