<script setup lang="ts">
import { shallowRef, ref } from 'vue'
import PlaceholderComponent from '../components/PlaceholderComponent.vue';
import SettingsAbout from '../components/settings/SettingsAbout.vue';
import SettingsUpdate from '../components/settings/SettingsUpdate.vue';
import SettingsProfile from '../components/settings/SettingsProfile.vue';
import SettingsAudio from '../components/settings/SettingsAudio.vue';

interface MenuElement {
  name: string;
  tabs: Tab[];
}

interface Tab {
  name: string;
  component: any;
}

const menu_elements: MenuElement[] = [
  {
    name: "General",
    tabs: [
      {
        name: "User Profile",
        component: SettingsProfile
      },
      {
        name: "Audio",
        component: SettingsAudio
      },
    ]
  },
    {
    name: "Administration",
    tabs: [
      {
        name: "User Settings",
        component: PlaceholderComponent
      },
      {
        name: "User Settings",
        component: PlaceholderComponent
      },
      {
        name: "User Settings",
        component: PlaceholderComponent
      },
      {
        name: "User Settings",
        component: PlaceholderComponent
      },
    ]
  },
  {
    name: "About",
    tabs: [
      {
        name: "About",
        component: SettingsAbout
      },
      {
        name: "Update",
        component: SettingsUpdate
      },
    ]
  }
]

const current_tab = shallowRef(menu_elements[0].tabs[0]);
const are_changes = ref(false);

function setTab(tab: Tab) {
  if (are_changes.value) {
    return;
  }
  current_tab.value = tab;
}

function changes(changes: boolean) {
  are_changes.value = changes;
}
</script>

<template>
  <div class="settings-container">
    <div class="container">
      <section class="section">
        <div class="columns">
          <div class="column is-one-third settings-tabs">
            <aside class="menu">
              <template v-for="menu_element in menu_elements">
                <p class="menu-label">{{ menu_element.name }}</p>
                <ul class="menu-list">
                  <li v-for="tab in menu_element.tabs">
                    <a @click="setTab(tab)" :class="{ 'is-active': tab == current_tab }">{{ tab.name }}</a>
                  </li>
                </ul>
              </template>
            </aside>
          </div>
          <div class="column">
            <h1 class="title">{{ current_tab.name }}</h1>
            <KeepAlive include="SettingsUpdate">
              <component :is="current_tab.component" @changes="changes"></component>
            </KeepAlive>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.settings-container {
  background-color: var(--background-color);
  height: 100%;
  width: 100%;
}

.settings-tabs {
  overflow-y: auto;
}

.section, .columns {
  height: 100%;
}

.section {
  flex-grow: 1;
}

.container {
  display: flex;
  height: 100%;
}
</style>
