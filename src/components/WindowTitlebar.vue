<script setup lang="ts">
import { appWindow } from '@tauri-apps/api/window';
import { ref } from 'vue';

const emit = defineEmits(['toggleTheme', 'toggleSettings']);
const isMaximized = ref(await appWindow.isMaximized());

appWindow.onResized(async (_) => {
  isMaximized.value = await appWindow.isMaximized();
});
</script>

<template>
  <div class="titlebar" data-tauri-drag-region>
    <div class="titlebar__start">
      <div class="window-control-button" @click="emit('toggleSettings')">
        <font-awesome-icon icon="fa-solid fa-bars" alt="settings" />
      </div>
      <div class="window-control-button" @click="emit('toggleTheme')">
        <font-awesome-icon icon="fa-solid fa-bars" alt="settings" />
      </div>
    </div>
    <div class="titlebar__end">
      <div class="window-control-button" @click="appWindow.minimize">
        <font-awesome-icon icon="fa-solid fa-window-minimize" alt="minimize" />
      </div>
      <div class="window-control-button" @click="appWindow.toggleMaximize">
        <font-awesome-icon icon="fa-solid fa-window-restore" alt="restore" v-if="isMaximized" />
        <font-awesome-icon icon="fa-solid fa-window-maximize" alt="maximize" v-else />
      </div>
      <div class="window-control-button" @click="appWindow.close">
        <font-awesome-icon icon="fa-solid fa-xmark" size="lg" alt="close" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.titlebar {
  border-bottom: 1px solid var(--border-color-dark);
  display: flex;
  flex-wrap: nowrap;
  height: var(--titlebar-height);
  justify-content: space-between;
  user-select: none;
  z-index: 999;

  &__start, &__end {
    display: flex;
    flex-wrap: nowrap;
  }
}

#titlebar-logo {
  height: 100%;
  max-width: unset;
  padding: calc(var(--titlebar-height) * 0.1);
}

.window-control-button {
  align-items: center;
  color: var(--text-color);
  display: inline-flex;
  height: 100%;
  justify-content: center;
  width: var(--titlebar-height);

  &:hover {
    background-color: var(--background-color-secondary);
  }
  &:last-child:hover {
    background-color: rgb(244, 82, 42);
  }
}
</style>
