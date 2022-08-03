<script setup lang="ts">
import use_users from '../composables/users';
import UserAvatar from './UserAvatar.vue';
import { UserFlag } from '../model/enum';
import UserProfile from './UserProfile.vue';

const { users } = use_users();
</script>

<template>
  <div class="user-list px-2">
    <p class="menu-label ml-4 mt-5 mb-0">
      Members — {{ users.length }}
    </p>
    <Popper
      v-for="user in users"
      :key="user.connection.ip"
      placement="left"
      offset-skid="66"
    >
      <div class="user px-3 py-2">
        <div class="avatar mr-3">
          <UserAvatar />
        </div>
        <p class="mr-2">
          {{ user.connection.alias ?? user.username ?? user.connection.ip }}
        </p>
        <font-awesome-icon
          v-if="user.flags.includes(UserFlag.Host)"
          class="host-icon"
          icon="fa-solid fa-crown"
        />
      </div>
      <template #content>
        <UserProfile :user="user" />
      </template>
    </Popper>
  </div>
</template>

<style scoped lang="scss">
.user-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  height: 100%;
  min-width: 280px;
  overflow-x: hidden;
  overflow-y: auto;
  width: 280px;
}

.user {
  align-items: center;
  border-radius: var(--radius);
  cursor: pointer;
  display: flex;

  & > p {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover,
  &:focus {
    background-color: var(--background-color-secondary);
  }
}

.avatar {
  flex-shrink: 0;
  width: 40px;
}

.host-icon {
  color: rgb(242 163 25);
}
</style>
