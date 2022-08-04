<script setup lang="ts">
import { computed } from 'vue';
import use_users from '../composables/users.js';
import UserAvatar from './UserAvatar.vue';
import { UserState } from '../model/enum.js';
import { use_object_url_store } from '../stores/objects.js';

const { users, call } = use_users();

const relevant_users = computed(() => users.value.filter((user) => user.state === UserState.Active || user.state === UserState.Pending));
</script>

<template>
  <div
    class="media-box py-3 px-4"
    :class="{ 'is-call p-4': relevant_users.length > 0 }"
  >
    <div v-if="relevant_users.length === 0">
      <FontAwesomeIcon icon="fa-solid fa-user-group" />
      <span class="ml-3">Room</span>
    </div>
    <div v-if="relevant_users.length === 0">
      <FontAwesomeIcon
        class="media-icon"
        icon="fa-solid fa-phone"
        @click="call"
      />
    </div>
    <div
      v-for="user in relevant_users"
      :key="user.connection.ip"
      class="avatar-wrapper m-3"
      :class="[
        { 'is-pending': user.state === UserState.Pending },
        { 'is-talking': false },
      ]"
    >
      <div class="avatar">
        <UserAvatar :src="use_object_url_store().get(`avatar-image-${user.connection.ip}`)" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.media-box {
  align-items: center;
  border-bottom: 1px solid var(--border-color-dark);
  box-shadow: 0 2px 10px -5px var(--border-color-dark);
  display: flex;
  justify-content: space-between;
  resize: none;
}

.is-call {
  background-color: var(--border-color-dark);
  border-bottom: unset;
  box-shadow: unset;
  justify-content: center;
  overflow: auto;
  resize: vertical;
  min-height: 200px;
}

.media-icon {
  cursor: pointer;

  &:hover,
  &:focus {
    color: var(--text-color-dark);
  }
}

.avatar-wrapper {
  background: black;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(255 255 255 / 100%);
  height: 90px;
  width: 90px;
}

.is-pending {
  animation: pulse 2s infinite;

  & > .avatar {
    filter: brightness(50%);
  }
}

.is-talking {
  box-shadow: 0 0 0 5px rgb(44 145 76);
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
