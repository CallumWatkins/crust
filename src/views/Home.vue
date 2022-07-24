<script setup lang="ts">
import { ref } from 'vue';
import ChevronDown from '@/components/ChevronDown.vue';
import InlineHelpTip from '../components/InlineHelpTip.vue';
import { Connection, use_connections } from '../composables/connections';

const { recent_connections } = use_connections();

let input_ip = ref("");
let input_public = ref(false);

function fill_input(conn: Connection) {
  input_ip.value = conn.ip;
}

function join() {
  const ip = input_ip.value;
  // TODO
}

function host() {
  const is_public = input_public.value;
  // TODO
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
      <img id="logo" alt="Crust logo" src="../../app-icon.svg" draggable="false" />
    </section>
    <section class="tabs-container">
      <div class="tabs is-centered is-large is-fullwidth">
        <ul>
          <li v-for="tab in Tabs" :class="{ 'is-active': current_tab === tab }"><a @click="current_tab = tab">{{ tab }}</a></li>
        </ul>
      </div>
      <Transition mode="out-in" name="quick-fade">
        <div v-if="current_tab === Tabs.Host">
          <div class="field has-addons has-addons-centered mb-5">
            <div class="level">
              <div class="level-left">
                <div class="level-item">
                  <div class="level-item control is-flex is-align-content-center is-size-5">
                    <div>Open session</div>
                  </div>
                </div>
                <div class="level-item mr-3">
                  <InlineHelpTip content="Allow uninvited participants to join this session" />
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <div class="control">
                    <input id="make_public" type="checkbox" name="make_public" class="switch is-medium is-success" v-model="input_public">
                    <label for="make_public"></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="field is-grouped is-grouped-centered">
            <div class="control">
              <button class="button is-large is-rounded is-primary" @click="host">Host</button>
            </div>
          </div>
        </div>
        <div v-else-if="current_tab === Tabs.Join">
          <div class="field has-addons has-addons-centered mb-5">
            <div class="control is-expanded">
              <input id="ip-input" v-model="input_ip" class="input is-large btn-large" type="text" placeholder="IP Address">
            </div>
            <div class="control">
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
            </div>
          </div>
          <div class="field is-grouped is-grouped-centered">
            <div class="control">
              <button class="button is-large is-rounded is-primary" :disabled="input_ip === ''" @click="join">Join</button>
            </div>
          </div>
        </div>
      </Transition>
    </section>
  </div>
</template>

<style scoped lang="scss">
.tabs-container {
  width: 100%;
  max-width: 400px;

  #make_public + label {
    padding-left: 3.75rem !important;

    &::before {
      top: 13px !important;
    }

    &::after {
      top: 17px !important;
    }
  }
}

#logo {
  width: 270px;
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
}
</style>
