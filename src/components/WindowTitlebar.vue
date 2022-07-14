<script setup lang="ts">
import { appWindow } from '@tauri-apps/api/window';

const emit = defineEmits(['toggleTheme']);
</script>

<template>
  <div class="titlebar" data-tauri-drag-region>
    <div class="titlebar__start" data-tauri-drag-region>
      <img id="titlebar-logo" alt="Crust logo" src="@/assets/logo.svg" @click="emit('toggleTheme')" />
    </div>
    <div class="titlebar__end">
      <div class="window-control-button" @click="appWindow.minimize">
        <font-awesome-icon icon="fa-solid fa-window-minimize" alt="minimize" />
      </div>
      <div class="window-control-button" @click="appWindow.maximize">
        <font-awesome-icon icon="fa-solid fa-window-maximize" alt="maximize" />
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
  z-index: 999;
  height: 50px;
  user-select: none;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;

  &__start {
    display: flex;
    flex-wrap: nowrap;
  }

  &__end {
    display: flex;
    flex-wrap: nowrap;
  }
}

#titlebar-logo {
  padding: 0.3rem;
  height: 100%;
  max-width: unset;
}

.window-control-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 100%;

  &:hover {
    background-color: var(--background-color-secondary);
  }
  &:last-child:hover {
    background-color: rgb(244, 82, 42);
  }
}
</style>
