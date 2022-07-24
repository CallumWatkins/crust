import { ref, readonly } from 'vue';

export default function use_settings() {
  const emit = defineEmits(['changes']);

  const are_changes = ref(false);

  function set_changes(changes: boolean) {
    are_changes.value = changes;
    emit('changes', changes);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function read_setting(key: string) {
    // 🦀🦀🦀 Rust API 🦀🦀🦀
    return { temp: 'data' };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function write_setting(key: string, value: object): boolean {
    // 🦀🦀🦀 Rust API 🦀🦀🦀
    return true;
  }

  return {
    emit,
    are_changes: readonly(are_changes),
    set_changes,
    read_setting,
    write_setting,
  };
}
