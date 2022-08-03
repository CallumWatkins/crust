import { isRegistered, register, ShortcutHandler, unregister } from '@tauri-apps/api/globalShortcut';

// eslint-disable-next-line max-len
export const valid_shortcut = /^(?:(?:Command|Cmd|Control|CommandOrControl|CmdOrCtrl|Alt|Option|AltGr|Shift|Super|Meta)\+)*(?:[0-9A-Z()!@#$%^&*:;+=<,>.?/~`{}[\]|\\"' ]|F[1-9]|F1[0-9]|F2[0-4]|Plus|Space|Tab|Capsock|Numlock|Scrolllock|Backspace|Delete|Insert|Return|Enter|Up|Down|Left|Right|Home|End|PageUp|PageDown|Escape|Esc|VolumeUp|VolumeDown|VolumeMute|MediaNextTrack|MediaPreviousTrack|MediaStop|MediaPlayPause|PrintScreen|num[0-9]|numdec|numadd|numsub|nummult|numdiv)$/;

export async function register_shortcut(shortcut: string, handler: ShortcutHandler) {
  if (await isRegistered(shortcut)) await unregister(shortcut);
  await register(shortcut, handler);
}

export async function unregister_shortcut(shortcut: string) {
  await unregister(shortcut);
}

export async function is_registered(shortcut: string): Promise<boolean> {
  return isRegistered(shortcut);
}
