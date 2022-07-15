<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  canCloseWithBackground?: boolean,
  hasCloseButton?: boolean,
  isOpen?: boolean,
  isCard?: boolean,
  cardTitle?: string,
}

const props = withDefaults(defineProps<Props>(), {
  canCloseWithBackground: true,
  hasCloseButton: true,
  isOpen: true,
  isCard: false,
});

const emit = defineEmits(['closed']);

const isActive = ref(false);

watch(
  () => props.isOpen,
  (newVal) => isActive.value = newVal,
  { immediate: true }
);

function close(data?: any) {
  isActive.value = false;
  emit("closed", data);
}
</script>

<template>
  <div class="modal" :class="{ 'is-active': isActive }">
    <div class="modal-background" @click="if (props.canCloseWithBackground) close();"></div>
    <div class="modal-card" v-if="isCard">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ cardTitle }}</p>
        <button class="delete" aria-label="close" v-if="hasCloseButton" @click="close()"></button>
      </header>
      <section class="modal-card-body">
        <slot :close="close"></slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="foot" :close="close"></slot>
      </footer>
    </div>
    <div class="modal-content" v-else>
      <slot :close="close"></slot>
    </div>
    <button class="modal-close is-large" aria-label="close" v-if="!isCard && hasCloseButton" @click="close()"></button>
  </div>
</template>

<style scoped lang="scss">
.modal {
  top: var(--titlebar-height);
}

.modal-close::before, .modal-close::after,
.delete::before, .delete::after {
  background-color: var(--border-color);
}
</style>
