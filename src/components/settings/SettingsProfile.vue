<script setup lang="ts">
import { Ref, ref } from 'vue';
import { use_object_url_store } from '../../stores/objects';
import { set_new_avatar } from '../../helpers/avatar';
import { DatabaseSetting, theme_setting, username_setting, setting_on_changed } from '../../model/Setting';
import UserAvatar from '../UserAvatar.vue';
import SettingField from './SettingField.vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const profile_settings: Ref<DatabaseSetting<any>[]> = ref([
  username_setting,
  theme_setting,
]);

const object_url_store = use_object_url_store();

const loading_new_avatar = ref(false);
const loading_new_avatar_error = ref('');

async function change_avatar() {
  loading_new_avatar_error.value = '';
  loading_new_avatar.value = true;
  const result = await set_new_avatar();
  if (!result.ok) loading_new_avatar_error.value = result.val;
  loading_new_avatar.value = false;
}
</script>

<template>
  <div class="block">
    <div class="avatar-container">
      <UserAvatar
        :src="object_url_store.get('avatar-image')"
        class="avatar"
      />
      <div class="is-flex is-align-items-center is-relative is-align-self-stretch">
        <button
          class="button"
          :class="{ 'is-loading': loading_new_avatar }"
          @click="change_avatar"
        >
          <span class="icon">
            <FontAwesomeIcon icon="fa-solid fa-image" />
          </span>
          <span>
            Change avatar
          </span>
        </button>
        <p v-if="loading_new_avatar_error !== null">
          {{ loading_new_avatar_error }}
        </p>
      </div>
    </div>
  </div>
  <div class="block settings-block">
    <SettingField
      v-for="profile_setting in profile_settings"
      :key="profile_setting.key"
      :setting="profile_setting"
      @changed="(newVal) => setting_on_changed(profile_setting, newVal)"
    />
  </div>
</template>

<style scoped lang="scss">
.avatar-container {
  display: flex;
  align-items: center;
  margin-bottom: calc(var(--spacing) * 4);
  gap: calc(var(--spacing) * 4);

  p {
    position: absolute;
    bottom: 0;
    white-space: nowrap;
    color: var(--text-color-danger);
  }
}

.avatar {
  width: 96px;
}

.settings-block {
  max-width: 450px;
}
</style>
