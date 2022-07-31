<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import Message from '../model/Message';
import ChatMessage from './ChatMessage.vue';
import UserAvatar from './UserAvatar.vue';

const route = useRoute();
const room_id = route.params.id;

const messages: Message[] = [
  new Message('1', 'User', 'Hey!', new Date(2022, 6, 27, 15, 14)),
  new Message('2', 'AnotherUser', 'Hi, how are you?', new Date(2022, 6, 27, 15, 26)),
  new Message('3', 'User', 'I\'m great thanks', new Date(2022, 6, 27, 15, 27)),
  new Message('4', 'User', 'Are you busy?', new Date(2022, 6, 27, 15, 27)),
];

function is_new_day(date1: Date, date2: Date): boolean {
  return date1.getFullYear() !== date2.getFullYear()
    || date1.getMonth() !== date2.getMonth()
    || date1.getDate() !== date2.getDate();
}

function time_difference_seconds(date1: Date, date2: Date): number {
  return (date2.getTime() - date1.getTime()) / 1000;
}

function is_new_group(previousMessage: Message, message: Message): boolean {
  if (previousMessage.sender !== message.sender) return true;
  if (time_difference_seconds(previousMessage.date, message.date) > 10 * 60) return true;
  return false;
}

const message_input = ref('');
const message_validation_error: Ref<string | null> = ref(null);
const message_validation_shake = ref(false);

function validate_message(message: string): string | null {
  if (message.length > 5000) return `Message length is too long (${message.length} / 5000)`;
  return null;
}

function show_message_validation_error(error: string) {
  message_validation_error.value = error;
  message_validation_shake.value = true;
}

function send_message() {
  const message = message_input.value.trim();
  if (message.length === 0) return;

  const validation_result = validate_message(message);
  if (validation_result !== null) {
    show_message_validation_error(validation_result);
    return;
  }
  message_validation_error.value = null;

  // TODO: send message
  message_input.value = '';
}
</script>

<template>
  <div class="is-flex is-flex-direction-column is-flex-grow-1 is-height-100">
    <div class="chat-list">
      <ol>
        <div class="chat-list__start">
          <div class="avatar">
            <UserAvatar />
          </div>
          <div>
            <h1 class="title">
              Room #{{ room_id }}
            </h1>
            <h2 class="subtitle">
              Group with <span>You</span> and <span>@AnotherUser</span>
            </h2>
            <p
              v-if="messages.length === 0"
              class="is-italic"
            >
              It's quiet in here. Say hello!
            </p>
          </div>
        </div>
        <template
          v-for="(message, index) in messages"
          :key="message.id"
        >
          <template v-if="index === 0 || is_new_day(messages[index - 1].date, message.date)">
            <div class="chat-list__divider">
              {{ message.date.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }) }}
            </div>
            <li>
              <ChatMessage
                :message="message"
                :new_group="true"
              />
            </li>
          </template>
          <li v-else>
            <ChatMessage
              :message="message"
              :new_group="is_new_group(messages[index - 1], message)"
            />
          </li>
        </template>
        <div class="chat-list__spacer" />
      </ol>
    </div>
    <div class="chat-input">
      <input
        v-model="message_input"
        class="input"
        :class="{ 'shake': message_validation_shake }"
        type="text"
        placeholder="Message"
        aria-label="Message"
        @animationend="message_validation_shake = false"
        @keypress.enter="send_message"
      >
      <div
        v-if="message_validation_error !== null"
        class="chat-input__error"
      >
        {{ message_validation_error }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-list {
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  flex-shrink: 1;

  &__start {
    display: flex;
    flex-direction: column;
    margin: 2rem;
    gap: 1rem;

    span {
      font-weight: bold;
    }

    .avatar {
      width: 80px;
    }
  }

  &__divider {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 0.75rem;
    color: var(--text-color-light);
    align-items: center;
    text-align: center;
    display: flex;

    &::before,
    &::after {
      content: "";
      flex: 1;
      border-bottom: 1px solid var(--background-color-secondary);
    }

    &:not(:empty)::before {
      margin-right: 0.5em;
    }

    &:not(:empty)::after {
      margin-left: 0.5em;
    }
  }

  &__spacer {
    height: 25px;
  }
}

.chat-input {
  position: relative;
  padding: 0 0.5rem 0.5rem;

  &__error {
    position: absolute;
    bottom: 100%;
    left: 1rem;
    font-size: 0.85rem;
    color: var(--text-color-danger);
    background-color: var(--background-color);
    padding: 0.2em 0.5em 0;
    border-top-left-radius: var(--small-radius);
    border-top-right-radius: var(--small-radius);
  }

  input {
    border: 0;
    background-color: var(--background-color-darker);

    &.shake {
      animation-name: shake;
      animation-duration: 0.4s;
    }
  }
}

@keyframes shake {
  10%,
  50%,
  90% {
    transform: translate3d(-3px, 0, 0);
  }

  30%,
  70% {
    transform: translate3d(3px, 0, 0);
  }
}
</style>
