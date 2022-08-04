<script setup lang="ts">
import ChatBox from '../components/ChatBox.vue';
import UserList from '../components/UserList.vue';
import MediaBox from '../components/MediaBox.vue';
</script>

<template>
  <div class="is-height-100 is-flex is-flex-direction-column">
    <MediaBox />
    <div class="is-flex is-height-100 is-flex-shrink-1">
      <ChatBox />
      <div class="user-list-wrapper">
        <UserList />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-list-wrapper {
  border-left: 1px solid var(--border-color-dark);
}
</style>
