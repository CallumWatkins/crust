<script setup lang="ts">
import { ref } from 'vue'

const input_devices = ["Default", "Device 1", "Device 2", "Device 3"];
const current_input_device = ref("Device 1");

const output_devices = ["Default", "Device 1", "Device 2", "Device 3"];
const current_output_device = ref("Default");

function set_input_device(device: string) {
  current_input_device.value = device;
}

function set_output_device(device: string) {
  current_output_device.value = device;
}
</script>

<template>
  <div class="audio-container">
    <div class="dropdown is-active">
      <Popper offsetDistance="6" offsetSkid="-150" placement="bottom">
        <div class="dropdown-trigger">
          <p class="label">Input Device</p>
          <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
            <span>{{ current_input_device }}</span>
            <span class="icon">
              <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
            </span>
          </button>
        </div>
        <template #content="{ close }">
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a v-for="device in input_devices" 
                class="dropdown-item" 
                :class="{ 'has-text-weight-bold': device == current_input_device }"
                @click="set_input_device(device); close()">
                <span>{{ device }}</span>
                <span class="icon">
                  <FontAwesomeIcon v-if="device == current_input_device" icon="fa-solid fa-circle-check" size="lg" />
                </span>
              </a>
            </div>
          </div>
        </template>
      </Popper>
    </div>
    <div class="dropdown is-active">
      <Popper offsetDistance="6" offsetSkid="-150" placement="bottom">
        <div class="dropdown-trigger">
          <p class="label">Output Device</p>
          <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
            <span>{{ current_output_device }}</span>
            <span class="icon">
              <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
            </span>
          </button>
        </div>
        <template #content="{ close }">
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a v-for="device in output_devices" 
                class="dropdown-item" 
                :class="{ 'has-text-weight-bold': device == current_output_device }"
                @click="set_output_device(device); close()">
                {{ device }}
                <span class="icon">
                  <FontAwesomeIcon v-if="device == current_output_device" icon="fa-solid fa-circle-check" size="lg" />
                </span>
              </a>
            </div>
          </div>
        </template>
      </Popper>
    </div>
  </div>
</template>

<style scoped lang="scss">
.audio-container {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacing) * 4);
}

.dropdown-trigger {
  .button {
    display: flex;
    justify-content: space-between;
    text-align: left;
    width: 300px;
  }
}

.dropdown-item {
  align-items: center;
  display: flex;
  justify-content: space-between;
  line-break: anywhere;
  white-space: normal;
}

.dropdown-content {
  width: 300px;
}

.icon {
  margin-left: var(--spacing);
  min-height: 1.25em;
  min-width: 1.25em;
}
</style>
