<script setup lang="ts">
import { ref } from 'vue';
import { Database } from '../database';
import { load_avatar } from '../helpers/avatar';
import WindowTitlebar from '../components/WindowTitlebar.vue';
import SettingsMenu from '../components/SettingsMenu.vue';

const db = await Database.load();

const show_settings = ref(false);

await load_avatar();
</script>

<template>
  <div
    id="root"
    class="is-flex is-flex-direction-column"
    :class="db.theme.toLowerCase()"
  >
    <div class="is-flex-shrink-0">
      <WindowTitlebar
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
</template>

<style lang="scss" scoped>
.settings {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
