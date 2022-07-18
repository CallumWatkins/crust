<script setup lang="ts">
import { ref } from 'vue';
import ChevronDown from '@/components/ChevronDown.vue';
import { Connection, use_connections } from '../composables/connection';

const { recent_connections } = use_connections();

let input_ip = ref("");

function fill_input(conn: Connection) {
  input_ip.value = conn.ip;
}
</script>

<template>
  <div class="container">
    <img id="logo" alt="Crust logo" src="@/assets/logo.svg" draggable="false" />

    <div class="field has-addons has-addons-centered">
      <p class="control">
        <input id="ip-input" v-model="input_ip" class="input is-large btn-large" type="text" placeholder="IP Address">
      </p>
      
      <p class="control">
        <div id="dropdown" class="dropdown is-active">
          <Popper offsetDistance="6" offsetSkid="45" placement="bottom">
            <div class="dropdown-trigger">
              <button id="dropdown-button" 
                class="button is-large btn-outlined btn-color-rusty btn-large" 
                aria-haspopup="true" 
                aria-controls="dropdown-menu">
                <span id="dropdown-icon" class="icon">
                  <ChevronDown></ChevronDown>
                </span>
              </button>
            </div>

            <template #content="{ close }">
              <div id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a v-for="conn in recent_connections" 
                    :key="conn.ip" 
                    class="dropdown-item" 
                    role="button" 
                    @click="fill_input(conn); close();">
                    {{ conn.alias ?? conn.ip }}
                  </a>

                  <hr class="dropdown-divider">

                  <a id="view-more" class="dropdown-item">View more</a>
                </div>
              </div>
            </template>
          </Popper>
        </div>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
#logo {
  width: 270px;
  margin-bottom: calc(var(--spacing) * 5);
}

#view-more {
  width: 100%;
  text-align: center;
}

#dropdown-button {
  border-left-color: #545454;
}

.container {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}
</style>
