<script setup lang="ts">

interface Props {
  src?: string,
}

const props = withDefaults(defineProps<Props>(), {
  src: undefined,
});

</script>

<template>
  <div v-if="src === undefined" class="fallback">
    <FontAwesomeLayers>
      <FontAwesomeIcon icon="fa-solid fa-circle" />
      <FontAwesomeIcon icon="fa-solid fa-user" />
    </FontAwesomeLayers>
  </div>
  <img v-else :src="src" alt="avatar" draggable="false" />
</template>

<style scoped lang="scss">
.fallback {
  aspect-ratio: 1/1;
  width: 100%;
  height: 100%;
  color: var(--text-color);

  .fa-layers {
    display: block;
    width: 100%;
    height: 100%;

    .fa-circle {
      width: 100%;
      height: 100%;
    }

    .fa-user {
      width: 55%;
      height: 55%;
      color: var(--background-color)
    }
  }
}

img {
  aspect-ratio: 1/1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100%;
}
</style>
