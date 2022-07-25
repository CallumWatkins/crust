<script setup lang="ts">
import { Setting } from '../../model/Setting';
import UserAvatar from '../UserAvatar.vue';
import SettingField from './SettingField.vue';

const profile_settings: Setting<any>[] = [
  {
    key: 'username',
    name: 'Username',
    value: 'MyName',
    valid: (val: string) => {
      if (val.length < 3 || val.length > 50) {
        return 'Username must be between 3 and 50 characters.';
      }
      return null;
    },
  } as Setting<string>,
  {
    key: 'dark-theme',
    name: 'Dark Theme',
    value: true,
    valid: (_) => null,
  } as Setting<boolean>,
];
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
      @changed="(newVal) => profile_setting.value = newVal"
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
