<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import { Setting } from '../../model/Setting';
import PopupModal from '../PopupModal.vue';

const props = defineProps<{
  setting: Setting<any>
}>();

const emit = defineEmits(['changed']);

const string_val = ref(typeof props.setting.value === 'string' ? props.setting.value : '');
const bool_val = ref(typeof props.setting.value === 'boolean' ? props.setting.value : false);
const error_message: Ref<string | null> = ref(null);
const show_edit_string_modal = ref(false);

watch(
  () => string_val.value,
  (val) => {
    error_message.value = props.setting.valid(val.trim());
  },
);

function open_edit_string_modal() {
  string_val.value = props.setting.value;
  show_edit_string_modal.value = true;
}

function close_edit_string_modal(save: boolean) {
  if (save) {
    emit('changed', string_val.value.trim());
  }
  show_edit_string_modal.value = false;
}

function edit_bool(newVal: boolean) {
  const valid = props.setting.valid(newVal);
  error_message.value = valid;
  if (valid === null) {
    emit('changed', newVal);
  } else {
    bool_val.value = props.setting.value;
  }
}
</script>

<template>
  <div v-if="typeof setting.value === 'string'" class="field">
    <div class="level mb-0">
      <div class="overflow-x-hidden">
        <div class="label mb-0">
          {{ setting.name }}
        </div>
        <p class="ellipsis overflow-x-hidden">{{ setting.value }}</p>
      </div>
      <button
        class="button"
        @click="open_edit_string_modal"
      >
        Edit
      </button>
    </div>
    <PopupModal
      v-if="show_edit_string_modal"
      v-slot="{ close }"
      :is_open="true"
      @closed="close_edit_string_modal"
    >
      <div class="box">
        <p class="block title is-4">
          {{ setting.name }}
        </p>
        <input
          v-model="string_val"
          class="block input"
          type="text"
          :aria-label="setting.name"
        >
        <p
          v-if="error_message !== null"
          class="block has-text-danger"
        >
          {{ error_message }}
        </p>
        <div class="block buttons">
          <button
            class="button is-success"
            :disabled="error_message !== null"
            @click="close(true)"
          >
            Save
          </button>
          <button
            class="button"
            @click="close(false)"
          >
            Cancel
          </button>
        </div>
      </div>
    </PopupModal>
  </div>
  <div v-else-if="typeof setting.value === 'boolean'" class="field">
    <div class="level mb-0">
      <div class="level-left">
        <div class="level-item">
          <div class="label mb-0">
            {{ setting.name }}
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="control">
            <input
              :id="`${setting.key}-settings-switch`"
              v-model="bool_val"
              type="checkbox"
              name="make-public"
              class="switch is-medium is-success"
              @change="edit_bool(bool_val)"
            >
            <label :for="`${setting.key}-settings-switch`" />
          </div>
        </div>
      </div>
    </div>
    <p v-if="error_message !== null" class="help has-text-danger">{{ error_message }}</p>
  </div>
</template>

<style lang="scss">
.level {
  gap: 1rem;
}

.overflow-x-hidden {
  overflow-x: hidden;
}

p.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
