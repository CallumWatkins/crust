<script setup lang="ts">
import { computed } from 'vue';
import use_users from '../composables/users.js';
import UserAvatar from './UserAvatar.vue';
import { UserState } from '../model/enum.js';
import { use_object_url_store } from '../stores/objects.js';

const { users, host, call } = use_users();

const relevant_users = computed(() => users.value.filter((user) => user.state === UserState.Active || user.state === UserState.Pending));
</script>

<template>
  <div
    class="media-box py-3 px-4"
    :class="{ 'is-call p-4': relevant_users.length > 0 }"
  >
    <div
      v-if="relevant_users.length === 0"
      class="is-flex is-justify-content-space-between is-align-items-center"
    >
      <div>
        <FontAwesomeIcon icon="fa-solid fa-user-group" />
        <span class="ml-3">Room</span>
      </div>
      <div>
        <FontAwesomeIcon
          class="media-icon"
          icon="fa-solid fa-phone"
          @click="call"
        />
      </div>
    </div>
    <div
      v-if="relevant_users.length > 0"
      class="is-flex is-justify-content-center is-align-items-center is-flex-grow-1"
    >
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
          <UserAvatar :src="use_object_url_store().get(`avatar-image-${user.connection.ip}`).unwrapOr(undefined)" />
        </div>
      </div>
    </div>
    <div
      v-if="relevant_users.length > 0 && host && host.state === UserState.Active"
      class="call-icons"
    >
      <FontAwesomeLayers class="call-icon">
        <FontAwesomeIcon icon="fa-solid fa-microphone" />
      </FontAwesomeLayers>
      <FontAwesomeLayers
        class="call-icon end-call-icon"
        @click="() => {
          if (host) {
            host.state = UserState.Inactive;
          }
        }"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-phone"
          transform="shrink-1 down-0.5 left-0.5"
        />
        <FontAwesomeIcon
          icon="fa-solid fa-xmark"
          transform="shrink-6 up-4 right-4"
        />
      </FontAwesomeLayers>
    </div>
    <div
      v-else-if="relevant_users.length > 0"
      class="call-icons"
    >
      <FontAwesomeLayers
        class="call-icon join-call-icon"
        @click="() => {
          if (host) {
            host.state = UserState.Active;
          }
        }"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-phone"
          transform="shrink-1 down-0.5 left-0.5"
        />
      </FontAwesomeLayers>
    </div>
  </div>
</template>

<style scoped lang="scss">
.media-box {
  border-bottom: 1px solid var(--border-color-dark);
  box-shadow: 0 2px 10px -5px var(--border-color-dark);
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 3);
  resize: none;
}

.is-call {
  background-color: var(--border-color-dark);
  border-bottom: unset;
  box-shadow: unset;
  overflow: auto;
  resize: vertical;
  min-height: 220px;
}

.call-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(var(--spacing) * 2);
}

.call-icon {
  background-color: var(--background-color);
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  height: 50px;
  width: 50px;

  &:hover,
  &:focus {
    background-color: var(--background-color-secondary);
  }
}

.end-call-icon {
  background-color: rgb(255 70 70);

  &:hover,
  &:focus {
    background-color: rgb(255 70 70);
  }
}

.join-call-icon {
  background-color: rgb(33 146 69);

  &:hover,
  &:focus {
    background-color: rgb(33 146 69);
  }
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
