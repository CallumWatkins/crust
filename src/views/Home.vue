<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
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

let show_dropdown = ref(false);
let input_ip = ref("");

function toggle_dropdown() {
  show_dropdown.value = !show_dropdown.value;
}

function window_click(e: Event) {
  const dropdown = document.getElementById("dropdown");
  if (dropdown && !dropdown.contains(e.target as Element)) {
    show_dropdown.value = false;
  }
}

function fill_input(conn: Connection) {
  input_ip.value = conn.ip;
  show_dropdown.value = false;
}

onMounted(() => {
  window.addEventListener('click', window_click);
})

onBeforeUnmount(() => {
  window.removeEventListener('click', window_click);
})
</script>

<template>
  <div class="container">
    <img id="logo" alt="Crust logo" src="@/assets/logo.svg" />

    <div class="field has-addons has-addons-centered">
      <p class="control">
        <input id="ip-input" v-model="input_ip" class="input is-large" type="text" placeholder="IP Address">
      </p>
      
      <p class="control">
        <div id="dropdown" class="dropdown" :class="{'is-active': show_dropdown}">
          <div class="dropdown-trigger">
            <button id="dropdown-button" class="button is-large" aria-haspopup="true" aria-controls="dropdown-menu" @click="toggle_dropdown">
              <span id="dropdown-icon" class="icon">
                <ChevronDown></ChevronDown>
              </span>
            </button>
          </div>

          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a v-for="conn in saved_connections" :key="conn.ip" class="dropdown-item" role="button" @click="fill_input(conn)">{{ conn.alias ?? conn.ip }}</a>

              <hr class="dropdown-divider">

              <a id="view-more" class="dropdown-item">View more</a>
            </div>
          </div>
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

#ip-input {
  border-radius: var(--large-radius) 0px 0px var(--large-radius);
}

#view-more {
  width: 100%;
}

#dropdown-button {
  border-bottom-right-radius: var(--large-radius);
  border-top-right-radius: var(--large-radius);
  border-left-color: #111111;

  &:hover, &:focus {
    background-color: bulmaRgba(var(--primary-color), 0.6);
  }

  &:focus {
    filter: saturate(50%);
  }
}

.container {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}

.dropdown-content {
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 2) var(--spacing);

  hr {
    margin-left: calc(var(--spacing) * -2);
    margin-right: calc(var(--spacing) * -2);
  }
}

.dropdown-item {
  border-radius: 8px;
}
</style>
