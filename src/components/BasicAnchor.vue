<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click', event: MouseEvent | KeyboardEvent): void,
  (e: 'auxclick', event: MouseEvent): void,
  (e: 'contextmenu', event: MouseEvent): void,
}>();
</script>

<template>
  <a
    tabindex="0"
    @click.prevent="(e) => emit('click', e)"
    @auxclick.prevent="(e) => emit('auxclick', e)"
    @contextmenu.prevent="(e) => emit('contextmenu', e)"
    @keypress.enter.prevent="(e) => emit('click', e)"
    @keypress.space.prevent="(e) => emit('click', e)"
  ><slot /></a>
</template>
