<script setup lang="ts">
import { ref } from 'vue'
import DropDownList from '../DropDownList.vue';

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
              <DropDownList :list="input_devices" 
                :default_item="current_input_device"
                :get_key="(device: string) => device"
                @changed="device => { set_input_device(device); close(); }">
              </DropDownList>
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
              <DropDownList :list="output_devices" 
                :default_item="current_output_device"
                :get_key="(device: string) => device" 
                @changed="device => { set_output_device(device); close(); }">
              </DropDownList>
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

:deep(.dropdown-item) {
  align-items: center;
  display: flex;
  justify-content: space-between;
  line-break: anywhere;
  white-space: normal;
}

.dropdown-content {
  width: 300px;
}
</style>
