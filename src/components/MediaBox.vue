<script setup lang="ts">
import { ref, Ref } from 'vue';
import User from '../model/User.js';
import use_users from '../composables/users.js';
import UserAvatar from './UserAvatar.vue';

const { users, active_users, pending_users } = use_users();
active_users.value = users.value.slice(0, 3);
pending_users.value = users.value.slice(4, users.value.length);
const relevant_users: Ref<User[]> = ref(active_users.value.concat(pending_users.value));
</script>

<template>
  <div class="media-box p-4">
    <div
      v-for="user in relevant_users"
      :key="user.connection.ip"
      class="avatar-wrapper m-2"
      :class="{ 'is-pending': pending_users.includes(user) }"
    >
      <div class="avatar">
        <UserAvatar />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.media-box {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--border-color-dark);
  overflow: auto;
  resize: vertical;
}

.avatar-wrapper {
  width: 94px;
  box-shadow: 0 0 0 0 rgba(255 255 255 / 100%);
  background: black;
  border-radius: 50%;
}

.is-pending {
  animation: pulse 2s infinite;

  & > .avatar {
    filter: brightness(50%);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255 255 255 / 70%);
  }

  70% {
    box-shadow: 0 0 0 8px rgba(255 255 255 / 0%);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(255 255 255 / 0%);
  }
}
</style>
