import { Database } from '../database';
import { use_global_store } from '../stores/global';
import { load_avatar } from './avatar';
import { register_shortcut } from './shortcut';

export default async function init() {
  const db = await Database.load();

  const task_load_avatar = load_avatar();

  const task_shortcut_mute = (db.value.shortcut_mute.some)
    ? register_shortcut(db.value.shortcut_mute.val, use_global_store().toggle_audio_input_status_mute)
    : Promise.resolve();

  const task_shortcut_deafen = (db.value.shortcut_deafen.some)
    ? register_shortcut(db.value.shortcut_deafen.val, use_global_store().toggle_audio_output_status_deafened)
    : Promise.resolve();

  await Promise.all([
    task_load_avatar,
    task_shortcut_mute,
    task_shortcut_deafen,
  ]);
}
