<script setup lang="ts">
import ChatBox from '../components/ChatBox.vue';
import UserList from '../components/UserList.vue';
</script>

<template>
  <div class="room">
    <ChatBox />
    <div class="user-list-wrapper">
      <UserList />
    </div>
  </div>
</template>

<style scoped lang="scss">
.room {
  display: flex;
  height: 100%;
}

.user-list-wrapper {
  border-left: 1px solid var(--border-color-dark);
}
</style>
