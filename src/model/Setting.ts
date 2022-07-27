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

export class DatabaseSetting<T extends DatabaseFields<Database_v0>[keyof DatabaseFields<Database_v0>]>
  extends Setting<DatabaseFieldsOfType<Database_v0, T>, T> {
  async save() {
    const db: Database_v0 = await Database.load();
    db[this.key] = this.value as any;
    await db.save();
  }
}

