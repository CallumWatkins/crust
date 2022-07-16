<script setup lang="ts">
import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/tauri'
import WindowTitlebar from '@/components/WindowTitlebar.vue';
import Settings from './views/Settings.vue';

enum Theme {
  Light = "LIGHT",
  Dark = "DARK",
}

const theme = ref(Theme.Dark);
const show_settings = ref(false);

let first_resolve = true;

function firstResolve() {
  if (first_resolve) {
    invoke('close_splashscreen');
    first_resolve = false;
  }
}
</script>

<template>
  <Suspense @resolve="firstResolve">
    <div id="root" class="is-flex is-flex-direction-column" :class="theme.toLowerCase()">
      <div class="is-flex-shrink-0">
        <WindowTitlebar @toggle-theme="theme = (theme === Theme.Dark ? Theme.Light : Theme.Dark)" @toggle-settings="show_settings = !show_settings" />
      </div>
      <div class="is-flex-grow-1 is-relative">
        <RouterView v-slot="{ Component, route }">
          <Transition :name="(route.meta?.transition as string | undefined) ?? ''">
            <div class="transition-wrapper" :key="route.name ?? 'Home'">
              <component :is="Component" />
            </div>
          </Transition>
        </RouterView>
        <Transition name="slide">
          <Settings class="settings" v-if="show_settings"></Settings>
        </Transition>
      </div>
    </div>
  </Suspense>
</template>

<style lang="scss">
@import "@/assets/styles/styles.scss";

.settings {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
