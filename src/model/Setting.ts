/* eslint-disable max-classes-per-file */
import { Database, DatabaseFields, DatabaseFieldsOfType, DatabaseLatest } from '../database';
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
    db[this.key] = this.value as any;
    await db.save();
  }
}

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

export { username_setting, theme_setting, connections_setting };
