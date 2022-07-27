/* eslint-disable max-classes-per-file */
import { Database, DatabaseFields, DatabaseFieldsOfType, Database_v0 } from '../database';
import { Theme } from './enum';

export abstract class Setting<K extends string, T> {
  readonly key: K;
  name: string;
  value: T;
  validator: (val: T) => string | null;

  constructor(
    key: K,
    name: string,
    value: T,
    validator: (val: T) => string | null,
  ) {
    this.key = key;
    this.name = name;
    this.value = value;
    this.validator = validator;
  }

  is_valid(value: T): string | null {
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
    validator: (val: T) => string | null,
    saver: (key: string, val: T) => Promise<void>,
  ) {
    super(key, name, value, validator);
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

const db = await Database.load();

const username_setting = new DatabaseSetting<string>(
  'username',
  'Username',
  db.value.username,
  (val: string) => {
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
  (_) => null,
);

export { username_setting, theme_setting };
