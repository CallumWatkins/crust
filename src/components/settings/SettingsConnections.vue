<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import { Connection, use_connections } from '../../composables/connections';
import PopupModal from '../PopupModal.vue';

const { connections, add_connection, update_connection } = use_connections();
const selected_conn: Ref<Connection | null> = ref(null);


const validation_error: Ref<string | null> = ref(null);
const modal_input_alias: Ref<string | null> = ref(null);
const modal_input_ip = ref("");
const show_alias_modal = ref(false);
const show_ip_modal = ref(false);
const show_add_modal = ref(false);

watch(
  () => modal_input_ip.value,
  (val) => {
    validation_error.value = validate_ip(val);
  }
)

// TODO: Check IP format.
function validate_ip(ip: string) {
  const trimmed_ip = ip.trim();
  const error_message = "IP address follows an invalid format."
  if(trimmed_ip.length < 10) {
    return error_message;
  }
  return null;
}

function open_alias_modal() {
  modal_input_alias.value = selected_conn.value!.alias ?? "";
  show_alias_modal.value = true;
}

function open_ip_modal() {
  modal_input_ip.value = selected_conn.value!.ip;
  show_ip_modal.value = true;
}

function open_add_modal() {
  modal_input_alias.value = null;
  modal_input_ip.value = "";
  show_add_modal.value = true;
}

function close_alias_modal(data: any) {
  if(data === true) {
    if(!modal_input_alias.value) {
      selected_conn.value!.alias = null;
    } else {      
      selected_conn.value!.alias = modal_input_alias.value.trim();
    }
    update_connection(selected_conn.value!);
  }
  show_alias_modal.value = false;
}

function close_ip_modal(data: any) {
  if(data === true) {
    selected_conn.value!.ip = modal_input_ip.value.trim();
    update_connection(selected_conn.value!);
  }
  show_ip_modal.value = false;
}

function close_add_modal(data: any) {
  if(data === true) {
    const conn: Connection = {
      alias: modal_input_alias.value,
      ip: modal_input_ip.value,
    };
    add_connection(conn);
    selected_conn.value = conn;
  }
  show_add_modal.value = false;
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="panel is-primary">
        <div class="panel-block">
          <p class="control has-icons-left">
            <input class="input" type="text" placeholder="Search">
            <span class="icon is-left">
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </span>
          </p>
        </div>
        <a v-for="conn in connections"
          class="panel-block"
          :class="{ 'is-active': selected_conn && selected_conn.ip == conn.ip }"
          @click="selected_conn = conn">
          <span class="panel-icon">
            <font-awesome-icon 
              v-if="selected_conn && selected_conn.ip == conn.ip" 
              icon="fa-solid fa-circle" size="sm" />
          </span>
          {{ conn.alias ?? conn.ip }}
        </a>
        <div class="panel-block is-flex is-justify-content-flex-end">
          <button class="button" @click="open_add_modal">
            <font-awesome-icon icon="fa-solid fa-plus" />
          </button>
        </div>
      </div>
    </div>
    <div class="column">
      <div v-if="selected_conn" class="edit-container">
        <div class="block field-container">
          <div>
            <strong>Alias</strong>
            <p>{{ selected_conn.alias }}</p>
          </div>
          <button class="button" @click="open_alias_modal">Edit</button>
        </div>
        <div class="block field-container">
          <div>
            <strong>IP Address</strong>
            <p>{{ selected_conn.ip }}</p>
          </div>
          <button class="button" @click="open_ip_modal">Edit</button>
        </div>
      </div>
    </div>
  </div>
  <PopupModal :canCloseWithBackground="true" :hasCloseButton="true" :isOpen="show_alias_modal" 
    :isCard="false" v-slot="{ close }" @closed="close_alias_modal">
    <div class="box">
      <p class="block title is-4">Alias</p>
      <input class="block input" type="text" v-model="modal_input_alias" />
      <p class="block has-text-danger" v-if="validation_error !== null">{{ validation_error }}</p>
      <div class="block buttons">
        <button class="button is-success" :disabled="validation_error !== null" @click="close(true)">Save</button>
        <button class="button" @click="close(false)">Cancel</button>
      </div>
    </div>
  </PopupModal>
  <PopupModal :canCloseWithBackground="true" :hasCloseButton="true" :isOpen="show_ip_modal" 
    :isCard="false" v-slot="{ close }" @closed="close_ip_modal">
    <div class="box">
      <p class="block title is-4">IP Address</p>
      <input class="block input" type="text" v-model="modal_input_ip" />
      <p class="block has-text-danger" v-if="validation_error !== null">{{ validation_error }}</p>
      <div class="block buttons">
        <button class="button is-success" :disabled="validation_error !== null" @click="close(true)">Save</button>
        <button class="button" @click="close(false)">Cancel</button>
      </div>
    </div>
  </PopupModal>
  <PopupModal :canCloseWithBackground="true" :hasCloseButton="true" :isOpen="show_add_modal" 
    :isCard="false" v-slot="{ close }" @closed="close_add_modal">
    <div class="box">
      <p class="block title is-4">Alias</p>
      <input class="block input" type="text" v-model="modal_input_alias" />
      <p class="block title is-4">IP Address</p>
      <input class="block input" type="text" v-model="modal_input_ip" />
      <p class="block has-text-danger" v-if="validation_error !== null">{{ validation_error }}</p>
      <div class="block buttons">
        <button class="button is-success" :disabled="validation_error !== null" @click="close(true)">Save</button>
        <button class="button" @click="close(false)">Cancel</button>
      </div>
    </div>
  </PopupModal>
</template>

<style scoped lang="scss">
.panel {
  height: 100%;
  overflow-y: auto;
}

.edit-container {
  display: flex;
  flex-direction: column;
}
</style>
