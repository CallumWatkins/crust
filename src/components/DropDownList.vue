<script setup lang="ts">
import { ref } from 'vue';

// Hopefully make this component generic once Vue supports it.
// See https://github.com/vuejs/rfcs/discussions/436
interface Props {
  list: Array<any>,
  default_item?: any | null,
  get_key: (item: any) => any,
  get_value?: ((item: any) => any) | null,
}

const props = withDefaults(defineProps<Props>(), {
  default_item: null,
  get_value: null,
});

const emit = defineEmits(['changed']);

const selected_item = ref(props.default_item);
const get_value: (item: any) => any = props.get_value ?? props.get_key;
</script>

<template>
  <a
    v-for="item in list"
    :key="get_key(item)"
    class="dropdown-item is-flex is-justify-content-space-between"
    :class="{ 'has-text-weight-bold': item == selected_item }"
    href="#"
    @click="selected_item = item; emit('changed', selected_item)"
  >
    <span>{{ get_value(item) }}</span>
    <span class="circle-icon">
      <FontAwesomeIcon
        v-if="item == selected_item"
        icon="fa-solid fa-circle-check"
        size="lg"
      />
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
