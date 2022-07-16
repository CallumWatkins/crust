<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue';
import PopupModal from '../PopupModal.vue';

const profile_settings = new Map<string, any>([
  ["Username", "John James Smith"],
  ["Example Field", "Some value"],
]);

const text_modal_name = ref("label")
const text_modal_input = ref("value");
const show_text_modal = ref(false);

function open_text_modal(name: string, value: string) {
  text_modal_name.value = name;
  text_modal_input.value = value;
  show_text_modal.value = true;
}

function close_text_modal(data: any) {
  if(data === true) {
    profile_settings.set(text_modal_name.value, text_modal_input.value);
  }
  show_text_modal.value = false;
}
</script>

<template>
  <div class="avatar-container">
    <img class="avatar" src="@/assets/placeholder-avatar.webp" alt="avatar">
    <div class="edit-avatar">
      <button class="button">Upload Profile Picture</button>
    </div>
  </div>
  <div class="profile-container">
    <div class="block field-container" v-for="[name, value] in profile_settings.entries()">
      <div class="label">
        <strong>{{ name }}</strong>
        <p class="value">{{ value }}</p>
      </div>
      <button class="button" @click="open_text_modal(name, value)">Edit</button>
    </div>
  </div>
  <PopupModal id="text-modal" :canCloseWithBackground="true" :hasCloseButton="true" :isOpen="show_text_modal" :isCard="false" v-slot="{ close }" @closed="close_text_modal">
    <div class="box">
      <p class="block"><strong>{{ text_modal_name }}</strong></p>
      <input class="block input" type="text" v-model="text_modal_input" />
      <div class="block buttons">
        <button class="button is-success" @click="close(true)">Save</button>
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
}

.avatar {
  width: 96px;
  border-radius: 100%;
}

.edit-avatar {
  margin-left: calc(var(--spacing) * 4);
}

.profile-container {
  display: flex;
  flex-direction: column;
  max-width: 450px;
}

.field-container {
  display: flex;
  justify-content: space-between;
}

.label {
  color: var(--text-color-dark);
  display: flex;
  flex-direction: column;
}

.value {
  color: var(--text-color);
  font-weight: normal;
}

.box {
  strong {
    font-size: 20px;
  }
}
</style>
