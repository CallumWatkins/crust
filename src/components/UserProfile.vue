<script setup lang="ts">
import { User } from '../composables/users';
import UserAvatar from './UserAvatar.vue';

interface Props {
  user: User;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="user-profile p-5">
    <div class="avatar mb-5">
      <UserAvatar />
    </div>
    <p class="is-size-4">
      <strong>{{ props.user.connection.alias.unwrapOr(null) ?? props.user.username ?? props.user.connection.ip }}</strong>
    </p>
  </div>
</template>

<style scoped lang="scss">
.user-profile {
  background-color: var(--background-color-darker);
  border-radius: var(--large-radius);
  box-shadow: $dropdown-content-shadow;
  min-width: 300px;
}

.avatar {
  width: 86px;
}
</style>
