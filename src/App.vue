<script setup lang="ts">
import { ref } from 'vue';
import WindowTitlebar from '@/components/WindowTitlebar.vue';

enum Theme {
  Light = "LIGHT",
  Dark = "DARK",
}

const theme = ref(Theme.Dark);
</script>

<template>
  <Suspense>
    <div id="root" class="is-flex is-flex-direction-column" :class="theme.toLowerCase()">
      <div class="is-flex-shrink-0">
        <WindowTitlebar @toggle-theme="theme = (theme === Theme.Dark ? Theme.Light : Theme.Dark)" />
      </div>
      <div class="is-flex-grow-1 is-relative">
        <RouterView v-slot="{ Component, route }">
          <Transition :name="(route.meta?.transition as string | undefined) ?? ''">
            <div class="transition-wrapper" :key="route.name ?? 'Home'">
              <component :is="Component" />
            </div>
          </Transition>
        </RouterView>
      </div>
    </div>
  </Suspense>
</template>

<style lang="scss">
@import "@/assets/styles/styles.scss";
</style>
