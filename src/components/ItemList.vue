<script setup lang="ts">
import { ref } from 'vue';
import BasicAnchor from './BasicAnchor.vue'

// Hopefully make this component generic once Vue supports it.
// See https://github.com/vuejs/rfcs/discussions/436
interface Props {
  layout: string,
  list: Array<any>,
  default_item?: any,
  get_key: (item: any) => any,
  get_value?: (item: any) => any,
}

const props = defineProps<Props>()

const emit = defineEmits(['changed']);

const selected_item = ref(props.default_item);
const get_value: (item: any) => any = props.get_value ?? props.get_key;
</script>

<template>
  <BasicAnchor
    v-for="item in list"
    :key="get_key(item)"
    :class="[
      { 'has-text-weight-bold': item == selected_item && layout != 'dropdown-fill' },
      { 'dropdown-item': layout == 'dropdown-fill' },
      { 'dropdown-item is-flex is-justify-content-space-between': layout == 'dropdown-select' },
      { 'panel-block': layout == 'panel-list' }
      ]"
    href="#"
    @click="selected_item = item; emit('changed', selected_item)"
  >
    <span 
      v-if="layout == 'panel-list'"
      class="panel-icon">
      <FontAwesomeIcon
        v-if="selected_item && get_key(item) == get_key(selected_item)"
        icon="fa-solid fa-circle"
        size="sm"
      />
    </span>
    <span>{{ get_value(item) }}</span>
    <span 
      v-if="layout == 'dropdown-select'" 
      class="circle-icon">
      <FontAwesomeIcon
        v-if="selected_item && get_key(item) == get_key(selected_item)"
        :icon="'fa-solid fa-circle-check'"
        :size="'lg'"
      />
    </span>
  </BasicAnchor>
  <hr 
    v-if="layout == 'dropdown-fill'"
    class="dropdown-divider" 
  />
  <BasicAnchor
    v-if="layout == 'dropdown-fill'"
    class="view-more dropdown-item"
  >
    View more
  </BasicAnchor>
</template>

<style scoped lang="scss">
.circle-icon {
  margin-left: var(--spacing);
  min-height: 1.25em;
  min-width: 1.25em;
}

.view-more {
  width: 100%;
  text-align: center;
}
</style>
