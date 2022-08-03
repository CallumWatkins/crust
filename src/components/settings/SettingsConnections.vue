<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import { use_connections } from '../../composables/connections';
import Connection from '../../model/Connection';
import { sort_by_property } from '../../helpers/sort';
import PopupModal from '../PopupModal.vue';
import ItemList from '../ItemList.vue';
import { BasicSetting, setting_on_changed, connections_setting } from '../../model/Setting';
import SettingField from './SettingField.vue';

const { add_connection, delete_connection } = use_connections();
const selected_conn: Ref<Connection | null> = ref(null);

const alias_setting: Ref<BasicSetting<string>> = ref(new BasicSetting(
  'alias',
  'Alias',
  selected_conn.value?.alias ?? '',
  null,
  async (_) => null,
  async (_, val: string): Promise<void> => {
    if (selected_conn.value) {
      selected_conn.value.alias = val;
      connections_setting.save();
    }
  },
));

const ip_setting: Ref<BasicSetting<string>> = ref(new BasicSetting(
  'ip',
  'IP',
  selected_conn.value?.alias ?? '',
  null,
  async (val: string) => {
    if (val.length < 1) {
      return 'IP is required.';
    }
    return null;
  },
  async (_, val: string): Promise<void> => {
    if (selected_conn.value) {
      selected_conn.value.ip = val;
      connections_setting.save();
    }
  },
));

const sorters = ref([
  {
    name: 'A-Z',
    function: () => connections_setting.value.sort(sort_by_property<Connection>('alias')),
  },
  {
    name: 'Z-A',
    function: () => connections_setting.value.sort(sort_by_property<Connection>('alias', false)),
  },
  {
    name: 'Most Recent',
    function: () => connections_setting.value.sort(sort_by_property<Connection>('last_connected', false)),
  },
  {
    name: 'Least Recent',
    function: () => connections_setting.value.sort(sort_by_property<Connection>('last_connected')),
  },
]);

const search = ref('');
const validation_error: Ref<string | null> = ref(null);
const modal_input_alias: Ref<string | null> = ref(null);
const modal_input_ip = ref('');
const show_add_modal = ref(false);
const show_delete_modal = ref(false);

watch(
  () => modal_input_ip.value,
  async (val) => {
    validation_error.value = await ip_setting.value.is_valid(val);
  },
  {
    immediate: true,
  },
);

function selected_conn_changed(conn: Connection) {
  selected_conn.value = conn;
  alias_setting.value.value = conn.alias ?? '';
  ip_setting.value.value = conn.ip;
}

function open_add_modal() {
  modal_input_alias.value = null;
  modal_input_ip.value = '';
  show_add_modal.value = true;
}

function open_delete_modal() {
  show_delete_modal.value = true;
}

function close_add_modal(data: any) {
  if (data === true) {
    const conn: Connection = {
      alias: modal_input_alias.value,
      ip: modal_input_ip.value,
      last_connected: null,
    };
    add_connection(conn);
    selected_conn.value = conn;
  }
  show_add_modal.value = false;
}

function close_delete_modal(data: any) {
  if (data === true && selected_conn.value) {
    delete_connection(selected_conn.value);
    selected_conn.value = null;
  }
  show_delete_modal.value = false;
}
</script>

<template>
  <div class="columns mb-0">
    <div class="column">
      <div class="panel is-primary is-flex is-flex-direction-column is-radiusless">
        <div class="panel-block">
          <p class="control has-icons-left pr-3">
            <input
              v-model="search"
              class="input"
              type="text"
              placeholder="Search"
              aria-label="Search"
            >
            <span class="icon is-left">
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            </span>
          </p>
          <div class="dropdown is-active">
            <Popper
              offset-distance="6"
              offset-skid="-100"
              placement="bottom"
            >
              <div class="dropdown-trigger">
                <button
                  class="button"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                >
                  <FontAwesomeIcon icon="fa-solid fa-sort" />
                </button>
              </div>
              <template #content="{ close }">
                <div
                  id="dropdown-menu"
                  class="dropdown-menu"
                  role="menu"
                >
                  <div class="dropdown-content">
                    <ItemList
                      layout="dropdown-select"
                      :list="sorters"
                      :get_key="(sorter: any) => sorter.name"
                      @changed="sorter => { sorter.function(); close(); }"
                    />
                  </div>
                </div>
              </template>
            </Popper>
          </div>
        </div>
        <div class="connections-list">
          <ItemList
            layout="panel-list"
            :list="connections_setting.value.filter(conn => conn.alias?.includes(search) || conn.ip.includes(search))"
            :get_key="conn => conn.ip"
            :get_value="conn => conn.alias ?? conn.ip"
            @changed="selected_conn_changed"
          />
        </div>
      </div>
    </div>
    <div class="column">
      <div class="panel">
        <div class="panel-block">
          <button
            class="button"
            @click="open_add_modal"
          >
            <FontAwesomeIcon icon="fa-solid fa-plus" />
          </button>
        </div>
        <div v-if="selected_conn">
          <div class="panel-block is-block">
            <SettingField
              :setting="alias_setting"
              no_value="-"
              @changed="newVal => setting_on_changed(alias_setting, newVal)"
            />
            <SettingField
              :setting="ip_setting"
              @changed="newVal => setting_on_changed(ip_setting, newVal)"
            />
          </div>
          <div class="panel-block is-flex is-justify-content-flex-end">
            <button
              class="button is-danger"
              @click="open_delete_modal"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PopupModal
    v-slot="{ close }"
    :is_open="show_add_modal"
    @closed="close_add_modal"
  >
    <div class="box">
      <p class="block title is-4">
        Alias
      </p>
      <input
        v-model="modal_input_alias"
        class="block input"
        type="text"
        aria-label="Alias"
      >
      <p class="block title is-4">
        IP Address
      </p>
      <input
        v-model="modal_input_ip"
        class="block input"
        type="text"
        aria-label="IP Address"
      >
      <p
        v-if="validation_error !== null"
        class="block has-text-danger"
      >
        {{ validation_error }}
      </p>
      <div class="block buttons">
        <button
          class="button is-success"
          :disabled="validation_error !== null"
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
  <PopupModal
    v-slot="{ close }"
    :is_open="show_delete_modal"
    @closed="close_delete_modal"
  >
    <div class="box">
      <p class="block title is-4">
        Are you sure you want to delete "{{ selected_conn?.alias ?? selected_conn?.ip }}"?
      </p>
      <div class="block buttons">
        <button
          class="button is-danger"
          @click="close(true)"
        >
          Yes
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
</template>

<style scoped lang="scss">
.panel {
  height: 100%;
  overflow-x: visible;

  .connections-list {
    overflow-y: auto;
  }
}

.columns {
  height: 100%;
  min-height: 0;
}
</style>
