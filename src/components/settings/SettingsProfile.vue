<script setup lang="ts">
import { Ref, ref } from 'vue';
import { DatabaseSetting, theme_setting, username_setting, setting_on_changed } from '../../model/Setting';
import UserAvatar from '../UserAvatar.vue';
import SettingField from './SettingField.vue';

const profile_settings: Ref<DatabaseSetting<any>[]> = ref([
  username_setting,
  theme_setting,
]);
</script>

<template>
  <div class="block">
    <div class="avatar-container">
      <UserAvatar class="avatar" />
      <button class="button">
        Upload Profile Picture
      </button>
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
}

.avatar {
  width: 96px;
}

.settings-block {
  max-width: 450px;
}
</style>
