<script setup lang="ts">
import { ref, Ref } from 'vue';
import { Connection, use_connections } from '../../composables/connections';

const { connections } = use_connections();
const selected_conn: Ref<Connection | null> = ref(null);
</script>

<template>
<div class="columns">
  <div class="column panel is-primary">
    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="Search">
        <span class="icon is-left">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </span>
      </p>
    </div>
    <a v-for="conn in connections"
      class="panel-block"
      :class="{ 'is-active': selected_conn && selected_conn.ip == conn.ip }"
      @click="selected_conn = conn">
      <span class="panel-icon">
        <font-awesome-icon 
          v-if="selected_conn && selected_conn.ip == conn.ip" 
          icon="fa-solid fa-circle" size="sm" />
      </span>
      {{ conn.alias ?? conn.ip }}
    </a>
    <div class="column">

    </div>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>
