<script setup lang="ts">
const props = defineProps<{
    content: string
}>();
</script>

<template>
  <Popper placement="top" :hover="true" :interactive="false">
    <FontAwesomeIcon icon="fa-solid fa-circle-question" />
    <template #content>
      <div class="box">{{ content }}</div>
    </template>
  </Popper>
</template>

<style scoped lang="scss">
.box {
  background-color: var(--background-color-secondary);
  padding: 0.75rem 1rem;
  max-width: 60ch;
}
</style>
