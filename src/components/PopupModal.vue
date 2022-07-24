<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  can_close_with_background?: boolean,
  has_close_button?: boolean,
  is_open?: boolean,
  is_card?: boolean,
  card_title?: string,
}

const props = withDefaults(defineProps<Props>(), {
  can_close_with_background: true,
  hasCloseButton: true,
  isOpen: true,
  isCard: false,
  card_title: undefined,
});

const emit = defineEmits(['closed']);

const is_active = ref(false);

watch(
  () => props.isOpen,
  (newVal) => { is_active.value = newVal; },
  { immediate: true },
);

function close(data?: any) {
  is_active.value = false;
  emit('closed', data);
}
</script>

<template>
  <div
    class="modal"
    :class="{ 'is-active': is_active }"
  >
    <div
      class="modal-background"
      aria-hidden="true"
      @click="if (props.can_close_with_background) close();"
    />
    <div
      v-if="is_card"
      class="modal-card"
    >
      <header class="modal-card-head">
        <p class="modal-card-title">
          {{ card_title }}
        </p>
        <button
          v-if="has_close_button"
          class="delete"
          aria-label="close"
          @click="close()"
        />
      </header>
      <section class="modal-card-body">
        <slot :close="close" />
      </section>
      <footer class="modal-card-foot">
        <slot
          name="foot"
          :close="close"
        />
      </footer>
    </div>
    <div
      v-else
      class="modal-content"
    >
      <slot :close="close" />
    </div>
    <button
      v-if="!is_card && has_close_button"
      class="modal-close is-large"
      aria-label="close"
      @click="close()"
    />
  </div>
</template>

<style scoped lang="scss">
.modal {
  top: var(--titlebar-height);
}

.modal-close::before,
.modal-close::after,
.delete::before,
.delete::after {
  background-color: var(--border-color);
}
</style>
