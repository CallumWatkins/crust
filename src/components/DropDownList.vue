<script setup lang="ts">
import { ref, Ref } from 'vue';

interface Props {
  list: Array<any>,
  default_item: any,
}

const props = withDefaults(defineProps<Props>(), {
  default_item: null
});

const emit = defineEmits(['changed']);

const selected_item = ref(props.default_item);
</script>

<template>
  <a v-for="item in list"
    class="dropdown-item is-flex is-justify-content-space-between" 
    :class="{ 'has-text-weight-bold': item == selected_item }"
    @click="selected_item = item; emit('changed', selected_item)">
    <span>{{ typeof item === 'string' ? item : item.name }}</span>
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
