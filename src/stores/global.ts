import { defineStore, acceptHMRUpdate } from 'pinia';

interface State {
  _audio_input_status_mute: boolean
  _audio_output_status_deafened: boolean
}

// eslint-disable-next-line import/prefer-default-export
export const use_global_store = defineStore({
  id: 'global',
  state: (): State => ({
    _audio_input_status_mute: false,
    _audio_output_status_deafened: false,
  }),
  getters: {
    audio_input_status_mute(state: State): boolean { return state._audio_input_status_mute; },
    audio_output_status_deafened(state: State): boolean { return state._audio_output_status_deafened; },
  },
  actions: {
    toggle_audio_input_status_mute() { this._audio_input_status_mute = !this._audio_input_status_mute; },
    toggle_audio_output_status_deafened() { this._audio_output_status_deafened = !this._audio_output_status_deafened; },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(use_global_store, import.meta.hot));
}
