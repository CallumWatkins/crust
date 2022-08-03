/* eslint-disable max-classes-per-file */
import { Database, DatabaseFields, DatabaseFieldsOfType, DatabaseLatest } from '../database';
import { is_registered, register_shortcut, unregister_shortcut, valid_shortcut } from '../helpers/shortcut';
import { use_global_store } from '../stores/global';
import Connection from './Connection';
import { Theme } from './enum';

export abstract class Setting<K extends string, T> {
  readonly key: K;
  name: string;
  value: T;
  possible_values: T[] | null;
  validator: (val: T) => Promise<string | null>;

  constructor(
    key: K,
    name: string,
    value: T,
    possible_values: T[] | null,
    validator: (val: T) => Promise<string | null>,
  ) {
    this.key = key;
    this.name = name;
    this.value = value;
    this.possible_values = possible_values;
    this.validator = validator;
  }

  async is_valid(value: T): Promise<string | null> {
    return this.validator(value);
  }

  abstract save(): Promise<void>;
}

export class BasicSetting<T> extends Setting<string, T> {
  saver: (key: string, val: T) => Promise<void>;

  constructor(
    key: string,
    name: string,
    value: T,
    possible_values: T[] | null,
    validator: (val: T) => Promise<string | null>,
    saver: (key: string, val: T) => Promise<void>,
  ) {
    super(key, name, value, possible_values, validator);
    this.saver = saver;
  }

  async save() {
    this.saver(this.key, this.value);
  }
}

export class DatabaseSetting<T extends DatabaseFields<DatabaseLatest>[keyof DatabaseFields<DatabaseLatest>]>
  extends Setting<DatabaseFieldsOfType<DatabaseLatest, T>, T> {
  async save() {
    const db = (await Database.load()).value;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    db[this.key] = this.value as any;
    await db.save();
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function setting_on_changed<T>(setting: Setting<any, T>, newVal: T) {
  setting.value = newVal;
  await setting.save();
}

const db = await Database.load();

const username_setting = new DatabaseSetting<string>(
  'username',
  'Username',
  db.value.username,
  null,
  async (val: string) => {
    if (val.length < 3 || val.length > 50) {
      return 'Username must be between 3 and 50 characters.';
    }
    return null;
  },
);

const theme_setting = new DatabaseSetting<Theme>(
  'theme',
  'Theme',
  db.value.theme,
  Object.values(Theme),
  async (_) => null,
);

const connections_setting = new DatabaseSetting<Connection[]>(
  'connections',
  'Connections',
  db.value.connections,
  null,
  async (_) => null,
);

async function is_valid_new_shortcut(old_shortcut: string, shortcut: string): Promise<string | null> {
  if (!shortcut.match(valid_shortcut)) {
    return 'Shortcut is not valid.';
  }
  if (shortcut !== old_shortcut && await is_registered(shortcut)) {
    return 'Shortcut already in use.';
  }
  return null;
}

const shortcut_mute_setting = new BasicSetting<string>(
  'mute',
  'Mute',
  db.value.shortcut_mute,
  null,
  async (val: string) => {
    const v = await is_valid_new_shortcut(db.value.shortcut_mute, val);
    if (v !== null) return v;
    return null;
  },
  async (_: string, val: string) => {
    await unregister_shortcut(db.value.shortcut_mute);
    db.value.shortcut_mute = val;
    await db.value.save();
    await register_shortcut(val, use_global_store().toggle_audio_input_status_mute);
  },
);

const shortcut_deafen_setting = new BasicSetting<string>(
  'deafen',
  'Deafen',
  db.value.shortcut_deafen,
  null,
  async (val: string) => {
    const v = await is_valid_new_shortcut(db.value.shortcut_deafen, val);
    if (v !== null) return v;
    return null;
  },
  async (_: string, val: string) => {
    await unregister_shortcut(db.value.shortcut_deafen);
    db.value.shortcut_deafen = val;
    await db.value.save();
    await register_shortcut(val, use_global_store().toggle_audio_output_status_deafened);
  },
);

export { username_setting, theme_setting, connections_setting, shortcut_mute_setting, shortcut_deafen_setting };
