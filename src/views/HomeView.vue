<script setup lang="ts">
import { ref } from 'vue';
import ChevronDown from '../components/ChevronDown.vue';
import InlineHelpTip from '../components/InlineHelpTip.vue';
import { Connection, use_connections } from '../composables/connections';
import ItemList from '../components/ItemList.vue';

const { recent_connections } = use_connections();

const input_ip = ref('');
const input_public = ref(false);

function fill_input(conn: Connection) {
  input_ip.value = conn.ip;
}

function join() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ip = input_ip.value;
  // TODO
}

function host() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const is_public = input_public.value;
  // TODO
}

enum Tabs {
  Join = 'Join',
  Host = 'Host',
}

const current_tab = ref(Tabs.Join);
</script>

<template>
  <div class="container">
    <section>
      <img
        id="logo"
        alt="Crust logo"
        src="../../app-icon.svg"
        draggable="false"
      >
    </section>
    <section class="tabs-container">
      <div class="tabs is-centered is-large is-fullwidth">
        <ul>
          <li
            v-for="tab in Tabs"
            :key="tab"
            :class="{ 'is-active': current_tab === tab }"
          >
            <a
              href="#"
              @click="current_tab = tab"
            >{{ tab }}</a>
          </li>
        </ul>
      </div>
      <Transition
        mode="out-in"
        name="quick-fade"
      >
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
                    <input
                      id="make-public"
                      v-model="input_public"
                      type="checkbox"
                      name="make-public"
                      class="switch is-medium is-success"
                    >
                    <label for="make-public" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="field is-grouped is-grouped-centered">
            <div class="control">
              <button
                class="button is-large is-rounded is-primary"
                @click="host"
              >
                Host
              </button>
            </div>
          </div>
        </div>
        <div v-else-if="current_tab === Tabs.Join">
          <div class="field has-addons has-addons-centered mb-5">
            <div class="control is-expanded">
              <input
                id="ip-input"
                v-model="input_ip"
                class="input is-large btn-large"
                type="text"
                placeholder="IP Address"
                aria-label="IP Address"
              >
            </div>
            <div class="control">
              <div
                id="dropdown"
                class="dropdown is-active"
              >
                <Popper
                  offset-distance="6"
                  offset-skid="45"
                  placement="bottom"
                >
                  <div class="dropdown-trigger">
                    <button
                      id="dropdown-button"
                      class="button is-large btn-outlined btn-color-rusty btn-large"
                      aria-haspopup="true"
                      aria-controls="dropdown-menu"
                    >
                      <span
                        id="dropdown-icon"
                        class="icon"
                      >
                        <ChevronDown />
                      </span>
                    </button>
                  </div>
                  <template #content="{ close }">
                    <div
                      id="dropdown-menu"
                      role="menu"
                    >
                      <div class="dropdown-content">
                        <ItemList
                          layout="dropdown-fill"
                          :addons="['view-more']"
                          :list="recent_connections"
                          :get_key="(conn: Connection) => conn.ip"
                          :get_value="(conn: Connection) => conn.alias ?? conn.ip"
                          @changed="conn => { fill_input(conn); close(); }"
                        />
                      </div>
                    </div>
                  </template>
                </Popper>
              </div>
            </div>
          </div>
          <div class="field is-grouped is-grouped-centered">
            <div class="control">
              <button
                class="button is-large is-rounded is-primary"
                :disabled="input_ip === ''"
                @click="join"
              >
                Join
              </button>
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
  min-height: 250px;

  #make-public + label {
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
  display: block;
  width: 270px;
}

#dropdown-button {
  border-left-color: #545454;
}

.container {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: calc(var(--spacing) * 5);

  section:first-child {
    margin-top: 5rem;
  }
}

@media screen and (max-height: 700px) {
  .container {
    flex-direction: row;
    justify-content: center;

    section:first-child {
      margin-top: 0;
    }
  }
}
</style>
