<script setup lang="ts">
import { appWindow } from '@tauri-apps/api/window';
import { onUnmounted, ref } from 'vue';

const emit = defineEmits(['toggleTheme', 'toggleSettings']);
const isMaximized = ref(await appWindow.isMaximized());

const onResizedUnlisten = await appWindow.onResized(async (_) => {
  isMaximized.value = await appWindow.isMaximized();
});

onUnmounted(() => {
  onResizedUnlisten();
})
</script>

<template>
  <div class="titlebar" data-tauri-drag-region>
    <div class="titlebar__start">
      <div class="square-icon-button" @click="emit('toggleSettings')">
        <font-awesome-icon icon="fa-solid fa-bars" alt="settings" />
      </div>
      <div class="square-icon-button" @click="emit('toggleTheme')">
        <font-awesome-icon icon="fa-solid fa-lightbulb" alt="theme" />
      </div>
    </div>
    <div class="titlebar__end">
      <div class="square-icon-button window-control" @click="appWindow.minimize">
        <font-awesome-icon icon="fa-solid fa-window-minimize" alt="minimize" />
      </div>
      <div class="square-icon-button window-control" @click="appWindow.toggleMaximize">
        <font-awesome-icon icon="fa-solid fa-window-restore" alt="restore" v-if="isMaximized" />
        <font-awesome-icon icon="fa-solid fa-window-maximize" alt="maximize" v-else />
      </div>
      <div class="square-icon-button window-control" @click="appWindow.close">
        <font-awesome-icon icon="fa-solid fa-xmark" size="lg" alt="close" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.titlebar {
  border-bottom: 1px solid var(--border-color-dark);
  z-index: 999;
  height: 50px;
  user-select: none;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;

  &__start, &__end {
    display: flex;
    flex-wrap: nowrap;
  }

  .square-icon-button {
    color: var(--text-color);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: var(--titlebar-height);

    &:hover {
      background-color: var(--background-color-secondary);
    }

    &.window-control:last-child:hover {
      background-color: rgb(244, 82, 42);
    }
  }
}
</style>
