<script setup lang="ts">
import { shallowRef, ref } from 'vue';
import type { Component } from 'vue';
import PlaceholderComponent from './PlaceholderComponent.vue';
import SettingsAbout from './settings/SettingsAbout.vue';
import SettingsUpdate from './settings/SettingsUpdate.vue';
import SettingsProfile from './settings/SettingsProfile.vue';
import SettingsAudio from './settings/SettingsAudio.vue';
import SettingsConnections from './settings/SettingsConnections.vue';
import SettingsShortcuts from './settings/SettingsShortcuts.vue';

interface Tab {
  name: string;
  component: Component;
}

interface MenuElement {
  name: string;
  tabs: Tab[];
}

const menu_elements: MenuElement[] = [
  {
    name: 'General',
    tabs: [
      {
        name: 'User Profile',
        component: SettingsProfile,
      },
      {
        name: 'Audio',
        component: SettingsAudio,
      },
      {
        name: 'Connections',
        component: SettingsConnections,
      },
      {
        name: 'Shortcuts',
        component: SettingsShortcuts,
      },
    ],
  },
  {
    name: 'Administration',
    tabs: [
      {
        name: 'User Settings',
        component: PlaceholderComponent,
      },
      {
        name: 'User Settings',
        component: PlaceholderComponent,
      },
      {
        name: 'User Settings',
        component: PlaceholderComponent,
      },
      {
        name: 'User Settings',
        component: PlaceholderComponent,
      },
    ],
  },
  {
    name: 'About',
    tabs: [
      {
        name: 'About',
        component: SettingsAbout,
      },
      {
        name: 'Update',
        component: SettingsUpdate,
      },
    ],
  },
];

const current_tab = shallowRef(menu_elements[0].tabs[0]);
const are_changes = ref(false);

function setTab(tab: Tab) {
  if (are_changes.value) {
    return;
  }
  current_tab.value = tab;
}

function changes(flag: boolean) {
  are_changes.value = flag;
}
</script>

<template>
  <div class="settings-container">
    <div class="container">
      <section class="is-flex-grow-1 p-5">
        <div class="columns is-marginless">
          <div class="column is-one-third settings-tabs">
            <aside class="menu">
              <template
                v-for="menu_element in menu_elements"
                :key="menu_element.name"
              >
                <p class="menu-label">
                  {{ menu_element.name }}
                </p>
                <ul class="menu-list">
                  <li
                    v-for="tab in menu_element.tabs"
                    :key="tab.name"
                  >
                    <a
                      :class="{ 'is-active': tab == current_tab }"
                      href="#"
                      @click="setTab(tab)"
                    >{{ tab.name }}</a>
                  </li>
                </ul>
              </template>
            </aside>
          </div>
          <div class="column is-narrow" />
          <div class="column settings-panel">
            <h1 class="title">
              {{ current_tab.name }}
            </h1>
            <KeepAlive include="SettingsUpdate">
              <component
                :is="current_tab.component"
                @changes="changes"
              />
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

.settings-panel {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.columns {
  height: 100%;
}

.container {
  display: flex;
  height: 100%;

  .column.is-narrow {
    width: 3rem;

    @include touch {
      width: 0;
    }
  }
}
</style>
