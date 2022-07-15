<script setup lang="ts">
import { ref } from 'vue';
import ChevronDown from '@/components/ChevronDown.vue';

interface Connection {
  alias?: string;
  ip: string;
}

//TODO: Fetch actual data
const saved_connections: Connection[] = [
  {
    alias: "John Doe",
    ip: "206.15.168.235",
  },
  {
    alias: "James Smith",
    ip: "3.66.149.79",
  },
  {
    alias: undefined,
    ip: "62.109.37.164",
  },
  {
    alias: undefined,
    ip: "34.61.123.222",
  },
  {
    alias: undefined,
    ip: "215.4.207.51",
  },
];

let input_ip = ref("");

function fill_input(conn: Connection) {
  input_ip.value = conn.ip;
}
</script>

<template>
  <div class="container">
    <img id="logo" alt="Crust logo" src="@/assets/logo.svg" />

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
                  <a v-for="conn in saved_connections" 
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

.dropdown-content {
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 2);

  hr {
    margin-left: calc(var(--spacing) * -2);
    margin-right: calc(var(--spacing) * -2);
  }
}

.dropdown-item {
  border-radius: var(--radius);
  min-width: 150px; 
  padding-right: 1rem;

  &:last-child {
    text-align: center;
  }
}
</style>
