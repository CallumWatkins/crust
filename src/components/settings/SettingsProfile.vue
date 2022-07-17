<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue';
import PopupModal from '../PopupModal.vue';
import UserAvatar from '../UserAvatar.vue';

interface Setting {
  key: string,
  name: string,
  value: any,
  valid: (val: any) => string | null
}

const profile_settings: Setting[] = [
  {
    key: "username",
    name: "Username",
    value: "",
    valid: (val: string) => {
      if (val.length < 3 || val.length > 50) {
        return "Username must be between 3 and 50 characters."
      }
      return null;
    }
  },
]

const current_setting: Ref<Setting | null> = ref(null);
const text_modal_input = ref("");
const validation_error: Ref<string | null> = ref("");
const show_text_modal = ref(false);

watch(
  () => text_modal_input.value,
  (val) => {
    if (current_setting.value !== null) {
      validation_error.value = current_setting.value.valid(val.trim());
    }
  }
);

function open_text_modal(profile_setting: Setting) {
  current_setting.value = profile_setting;
  text_modal_input.value = profile_setting.value;
  show_text_modal.value = true;
}

function close_text_modal(data: any) {
  if (data === true) {
    current_setting.value!.value = text_modal_input.value.trim();
    // TODO: persist(current_setting.value.key, current_setting.value.value)
  }
  current_setting.value = null;
  show_text_modal.value = false;
}
</script>

<template>
  <div class="avatar-container">
    <UserAvatar class="avatar" />
    <button class="button">Upload Profile Picture</button>
  </div>
  <div class="profile-container">
    <div class="block field-container" v-for="profile_setting in profile_settings">
      <div>
        <strong>{{ profile_setting.name }}</strong>
        <p>{{ profile_setting.value }}</p>
      </div>
      <button class="button" @click="open_text_modal(profile_setting)">Edit</button>
    </div>
  </div>
  <PopupModal id="text-modal" :canCloseWithBackground="true" :hasCloseButton="true" :isOpen="show_text_modal" :isCard="false" v-slot="{ close }" @closed="close_text_modal">
    <div class="box">
      <p class="block title is-4">{{ current_setting?.name ?? "" }}</p>
      <input class="block input" type="text" v-model="text_modal_input" />
      <p class="block has-text-danger" v-if="validation_error !== null">{{ validation_error }}</p>
      <div class="block buttons">
        <button class="button is-success" :disabled="validation_error !== null" @click="close(true)">Save</button>
        <button class="button" @click="close(false)">Cancel</button>
      </div>
    </div>
  </PopupModal>
</template>

<style scoped lang="scss">
.avatar-container {
  display: flex;
  align-items: center;
  margin-bottom: calc(var(--spacing) * 4);
  gap: calc(var(--spacing) * 4);
}

.avatar {
  width: 96px;
}

.profile-container {
  display: flex;
  flex-direction: column;
  max-width: 450px;
}

.field-container {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
</style>
