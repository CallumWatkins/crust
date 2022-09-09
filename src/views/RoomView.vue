<script setup lang="ts">
import ChatBox from '../components/ChatBox.vue';
import UserList from '../components/UserList.vue';
import MediaBox from '../components/MediaBox.vue';
</script>

<template>
  <div class="is-height-100 is-flex is-flex-direction-column">
    <MediaBox />
    <div class="content-wrapper is-flex">
      <ChatBox />
      <div class="user-list-wrapper">
        <UserList />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-wrapper {
  flex: 1;
  overflow-y: auto;
}

.user-list-wrapper {
  border-left: 1px solid var(--border-color-dark);
}
</style>
