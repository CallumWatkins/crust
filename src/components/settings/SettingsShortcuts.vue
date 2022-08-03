<script setup lang="ts">
import { Ref, ref } from 'vue';
import { BasicSetting, shortcut_mute_setting, shortcut_deafen_setting, setting_on_changed } from '../../model/Setting';
import SettingField from './SettingField.vue';

const shortcut_settings: Ref<BasicSetting<any>[]> = ref([
  shortcut_mute_setting,
  shortcut_deafen_setting,
]);
</script>

<template>
  <div class="block settings-block">
    <SettingField
      v-for="shortcut_setting in shortcut_settings"
      :key="shortcut_setting.key"
      :setting="shortcut_setting"
      @changed="(newVal) => setting_on_changed(shortcut_setting, newVal)"
    />
  </div>
</template>

<style scoped lang="scss">
.settings-block {
  max-width: 450px;
}
</style>
