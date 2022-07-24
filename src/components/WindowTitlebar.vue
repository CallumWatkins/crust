<script setup lang="ts">
import { appWindow } from '@tauri-apps/api/window';
import { onUnmounted, ref } from 'vue';

const emit = defineEmits(['toggleTheme', 'toggleSettings']);
const is_maximized = ref(await appWindow.isMaximized());
const is_focused = ref(true);

const on_resized_unlisten = await appWindow.onResized(async () => {
  is_maximized.value = await appWindow.isMaximized();
});

const on_focus_changed_unlisten = await appWindow.onFocusChanged(({ payload: focused }) => {
  is_focused.value = focused;
});

onUnmounted(() => {
  on_resized_unlisten();
  on_focus_changed_unlisten();
});
</script>

<template>
  <div
    class="titlebar"
    :class="{ 'focused': is_focused }"
    data-tauri-drag-region
  >
    <div class="titlebar__start">
      <div
        class="square-icon-button"
        tabindex="0"
        @click="emit('toggleSettings')"
        @keypress.enter="emit('toggleSettings')"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-bars"
          alt="settings"
        />
      </div>
      <div
        class="square-icon-button"
        tabindex="0"
        @click="emit('toggleTheme')"
        @keypress.enter="emit('toggleTheme')"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-lightbulb"
          alt="theme"
        />
      </div>
    </div>
    <div class="titlebar__end">
      <div
        class="square-icon-button window-control"
        tabindex="0"
        @click="appWindow.minimize"
        @keypress.enter="appWindow.minimize"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-window-minimize"
          alt="minimize"
        />
      </div>
      <div
        class="square-icon-button window-control"
        tabindex="0"
        @click="appWindow.toggleMaximize"
        @keypress.enter="appWindow.toggleMaximize"
      >
        <FontAwesomeIcon
          v-if="is_maximized"
          icon="fa-solid fa-window-restore"
          alt="restore"
        />
        <FontAwesomeIcon
          v-else
          icon="fa-solid fa-window-maximize"
          alt="maximize"
        />
      </div>
      <div
        class="square-icon-button window-control"
        tabindex="0"
        @click="appWindow.close"
        @keypress.enter="appWindow.close"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-xmark"
          size="lg"
          alt="close"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.titlebar {
  background-color: var(--background-color-darker);
  border-bottom: 1px solid var(--border-color-dark);
  z-index: 999;
  height: 50px;
  user-select: none;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;

  &__start,
  &__end {
    display: flex;
    flex-wrap: nowrap;
  }

  .square-icon-button {
    color: var(--text-color-light);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: var(--titlebar-height);

    &:hover {
      background-color: var(--background-color-secondary);
    }

    &.window-control:last-child:hover {
      background-color: rgb(244 82 42);
    }
  }

  &.focused {
    background-color: var(--background-color);

    .square-icon-button {
      color: var(--text-color);
    }
  }
}
</style>
