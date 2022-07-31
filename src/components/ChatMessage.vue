<script setup lang="ts">
import Message from '../model/Message';
import UserAvatar from './UserAvatar.vue';

defineProps<{
  message: Message,
  new_group: boolean,
}>();

function format_days_ago(date: Date) {
  const deltaDays = (date.getTime() - Date.now()) / (1000 * 3600 * 24);
  const formatter = new Intl.RelativeTimeFormat();
  return formatter.format(Math.round(deltaDays), 'days');
}
</script>

<template>
  <div
    class="message"
    :class="{ 'group-start': new_group }"
  >
    <UserAvatar
      v-if="new_group"
      class="avatar"
    />
    <h2
      v-if="new_group"
      class="message-header"
    >
      <span class="message-header__sender">{{ message.sender }}</span>
      <span class="message-header__timestamp"><time>{{ format_days_ago(message.date) }}</time></span>
    </h2>
    <div class="message-content">
      {{ message.message }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.message {
  position: relative;
  padding-left: 72px;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;

  &.group-start {
    margin-top: 1rem;
  }

  &:hover {
    background-color: rgb(0 0 0 / 10%);
  }

  &-header {
    &__sender {
      font-weight: bold;
    }

    &__timestamp {
      margin-left: 0.5rem;
      font-size: 0.85rem;
    }
  }

  .avatar {
    position: absolute;
    top: 0;
    left: 16px;
    width: 40px;
  }
}
</style>
