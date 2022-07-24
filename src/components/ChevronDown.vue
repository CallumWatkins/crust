<script setup lang="ts">
const props = defineProps<{
    width?: string
}>();

const width = props.width ?? '24px';
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    class="chevron-down"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
    />
  </svg>
</template>

<style scoped lang="scss">
.chevron-down {
    fill: var(--text-color);
    width: v-bind(width);
}
</style>
