<script setup lang="ts">
import { ref, Ref } from 'vue';

interface Props {
  list: Array<any>,
}

const emit = defineEmits(['changed']);

const props = defineProps<Props>();
const selected_item: Ref<any | null> = ref(null);
</script>

<template>
  <a v-for="item in list"
    class="dropdown-item is-flex is-justify-content-space-between" 
    :class="{ 'has-text-weight-bold': item == selected_item }"
    @click="selected_item = item; emit('changed', selected_item)">
    <span>{{ list as string[] ? item : item.name }}</span>
    <span class="circle-icon">
      <FontAwesomeIcon v-if="item == selected_item" icon="fa-solid fa-circle-check" size="lg" />
    </span>
  </a>
</template>

<style scoped lang="scss">
.circle-icon {
  margin-left: var(--spacing);
  min-height: 1.25em;
  min-width: 1.25em;
}
</style>
