<script setup lang="ts">
import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/tauri';
import WindowTitlebar from './components/WindowTitlebar.vue';
import SettingsMenu from './components/SettingsMenu.vue';
import { Theme } from './model/enum';
import { Database } from './database';

const db = await Database.loadRef();

const show_settings = ref(false);

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
    <div
      id="root"
      class="is-flex is-flex-direction-column"
      :class="db.theme"
    >
      <div class="is-flex-shrink-0">
        <WindowTitlebar
          @toggle-theme="db.theme = (db.theme === Theme.Dark ? Theme.Light : Theme.Dark)"
          @toggle-settings="show_settings = !show_settings"
        />
      </div>
      <div class="is-flex-grow-1 is-relative">
        <RouterView v-slot="{ Component, route }">
          <Transition :name="(route.meta?.transition as string | undefined) ?? ''">
            <div
              :key="route.name ?? 'Home'"
              class="transition-wrapper"
            >
              <component :is="Component" />
            </div>
          </Transition>
        </RouterView>
        <Transition name="slide">
          <SettingsMenu
            v-if="show_settings"
            class="settings"
          />
        </Transition>
      </div>
    </div>
  </Suspense>
</template>

<style lang="scss">
@import "@/assets/styles/styles";

.settings {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
