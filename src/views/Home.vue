<script setup lang="ts">
import { BindingTypes } from '@vue/compiler-core';
import { Directive, onBeforeUnmount, onMounted, reactive } from 'vue';
import ChevronDown from '../components/ChevronDown.vue';

interface Connection {
  alias?: string;
  ip: string;
}

//TODO: Fetch actual data
const data: Connection[] = [
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

const state = reactive({ 
    show_dropdown: false,
})

function toggle_dropdown() {
  state.show_dropdown = !state.show_dropdown;
}

function close_dropdown(e: Event) {
  const dropdown = document.getElementById("dropdown");
  if(dropdown && !dropdown.contains(e.target as Element)) {
    state.show_dropdown = false;
  }
}

function fill_input(e: Event) {
  const input = document.getElementById("ip-input") as HTMLInputElement;
  if(input) {
    input.value = (e.target as HTMLElement).dataset.ip ?? "";
    toggle_dropdown();
  }
}

onMounted(() => {
  window.addEventListener('click', close_dropdown);
})

onBeforeUnmount(() => {
  window.removeEventListener('click', close_dropdown);
})
</script>

<template>
  <div class="container">
    <img id="logo" alt="Crust logo" src="@/assets/logo.svg" />

    <div class="field has-addons has-addons-centered">
      <p class="control">
        <input id="ip-input" class="input is-large" type="text" placeholder="IP Address">
      </p>
      
      <p class="control">
        <div id="dropdown" class="dropdown" :class="{'is-active': state.show_dropdown}">
          <div class="dropdown-trigger">
            <button id="dropdown-button" class="button is-large" aria-haspopup="true" aria-controls="dropdown-menu" @click="toggle_dropdown">
              <span id="dropdown-icon" class="icon">
                <ChevronDown></ChevronDown>
              </span>
            </button>
          </div>

          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a v-for="item in data" class="dropdown-item" role="button" :data-ip="item.ip" @click="fill_input">{{ item.alias ?? item.ip }}</a>

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
@import "@/assets/styles/styles.scss";

#logo {
    width: 270px;
    margin-bottom: $spacing*5;
}

#ip-input {
  border-radius: $large-radius 0px 0px $large-radius;
}

#view-more {
  width: 100%;
}

#dropdown-button {
  border-bottom-right-radius: $large-radius;
  border-top-right-radius: $large-radius;
  border-left-color: $black;

  &:hover, &:focus {
    background-color: bulmaRgba($primary-color, 0.6);
  }

  &:focus {
    filter: saturate(50%);
  }
}

.container {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
}

.dropdown-content {
    padding: $spacing*2 $spacing*2 $spacing;

    hr {
        margin-left: -$spacing*2;
        margin-right: -$spacing*2;
    }
}

.dropdown-item {
  border-radius: 8px;
}
</style>
