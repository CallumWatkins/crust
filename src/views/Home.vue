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


enum Tabs {
  Join = "Join",
  Host = "Host",
}

let current_tab = ref(Tabs.Join);
</script>

<template>
  <div class="container">
    <section class="section mt-6">
      <img id="logo" alt="Crust logo" src="@/assets/logo.svg" draggable="false" />
    </section>
    <section class="tabs-container">
      <div class="tabs is-centered is-large is-fullwidth">
        <ul>
          <li v-for="tab in Tabs" :class="{ 'is-active': current_tab === tab }"><a @click="current_tab = tab">{{ tab }}</a></li>
        </ul>
      </div>
      <Transition mode="out-in" name="quick-fade">
        <div v-if="current_tab === Tabs.Host">
                </div>
              </div>
        </div>
        <div v-else-if="current_tab === Tabs.Join">
        </div>
      </Transition>
    </section>
  </div>
</template>

<style scoped lang="scss">
.tabs-container {
  width: 100%;
  max-width: 400px;

}

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
