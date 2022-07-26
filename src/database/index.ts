/* eslint-disable max-classes-per-file */
import { BaseDirectory, createDir, readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { Mutex } from 'async-mutex';
import { plainToInstance, instanceToPlain, Expose } from 'class-transformer';
import 'reflect-metadata';
import { gt as semVerGt, neq as semVerNeq, satisfies as semVerSatisfies, valid as semVerValid, clean as semVerClean } from 'semver';
import { Ref, ref } from 'vue';

/**
 * The base database class.
 *
 * @export
 * @abstract
 * @example
 * const db = await Database.load();
 * db.value = "value";
 * db.save();
 */
export abstract class Database {
  static readonly DB_BASE_DIR = BaseDirectory.App;
  static readonly DB_PATH = '';
  static readonly DB_FILE_NAME = 'db.json';

  /**
   * The latest version of the database.
   *
   * @static
   * @memberof Database
   */
  static readonly LATEST_VERSION = '0.0.0';

  /**
   * The database version.
   *
   * @abstract
   * @type {string}
   * @memberof Database
   */
  abstract readonly db_version: string;

  /**
   * Read from the database file on disk.
   *
   * @private
   * @static
   * @return The contents of the database file, or null if the file does not exist.
   * @memberof Database
   */
  private static async read_database_file(): Promise<string | null> {
    await createDir(Database.DB_PATH, { dir: Database.DB_BASE_DIR, recursive: true });
    try {
      return await readTextFile(Database.DB_PATH + Database.DB_FILE_NAME, { dir: Database.DB_BASE_DIR });
    } catch (ex) {
      console.error(ex);
      return null;
    }
  }

  /**
   * Write to the database file on disk.
   *
   * @private
   * @param {string} contents
   * @memberof Database
   */
  private static async write_database_file(contents: string) {
    await createDir(Database.DB_PATH, { dir: Database.DB_BASE_DIR, recursive: true });
    await writeTextFile(Database.DB_PATH + Database.DB_FILE_NAME, contents, { dir: Database.DB_BASE_DIR });
  }

  /**
   * Construct a database instance from a serialized string.
   *
   * @private
   * @static
   * @param {string} serialized The serialized database string.
   * @throws Will throw an error if `serialized` is null or cannot be converted into a database.
   * @throws {FutureVersionError} Will throw an error if the database version is greater than the latest compatible version.
   * @memberof Database
   */
  private static construct_database(serialized: string): Database {
    if (serialized == null) throw new Error('serialized is null');

    const obj = JSON.parse(serialized);
    console.log(obj);
    const version = semVerClean(obj?.db_version);
    console.log('Cleaned version', version);
    if (version === null || semVerValid(version) === null) throw new Error('Data is missing a valid version number');

    let db: Database | null = null;
    if (semVerSatisfies(version, '0.0.0')) db = Database_v0.deserialize(serialized);

    if (db === null) {
      if (semVerGt(version, Database.LATEST_VERSION)) throw new FutureVersionError(version);
      else throw new Error(`Compatible database model for version "${version}" not found`);
    }

    while (semVerNeq(semVerClean(db.db_version) ?? '', Database.LATEST_VERSION)) {
      db = db.upgrade_version();
    }

    return db;
  }

  private static singleton: Database_v0 | null = null;
  private static mutex = new Mutex();

  /**
   * Load the database from disk. Creates a new database if one does not already exist.
   *
   * @static
   * @return The latest version of the database version from disk or new.
   * @memberof Database
   */
  static async load(): Promise<Database_v0> {
    const releaseMutex = await Database.mutex.acquire();
    try {
      if (Database.singleton) return Database.singleton;

      const serialized: string | null = await Database.read_database_file();
      const db = (serialized === null)
        ? new Database_v0()
        : Database.construct_database(serialized);

      if (db instanceof Database_v0) {
        Database.singleton = db;
        return db;
      }

      throw new Error('Unexpected database version');
    } finally {
      releaseMutex();
    }
  }

  static async loadRef(): Promise<Ref<Database_v0>> {
    const db = await Database.load();
    return ref(db);
  }

  /**
   * Save the current database state to disk.
   *
   * @memberof Database
   */
  async save() {
    const releaseMutex = await Database.mutex.acquire();
    try {
      Database.write_database_file(this.serialize());
    } finally {
      releaseMutex();
    }
  }

  /**
   * Serialize the database state to a string.
   *
   * @abstract
   * @memberof Database
   */
  abstract serialize(): string;

  /**
   * Deserialize the database from a string,
   *
   * @abstract
   * @memberof Database
   */
  abstract upgrade_version(): Database;
}

/**
 * Version 0 (dev) of the database.
 *
 * @export
 * @extends {Database}
 */
export class Database_v0 extends Database {
  @Expose() readonly db_version = '0.0.0';

  @Expose() example = 'example data';

  serialize(): string {
    return JSON.stringify(instanceToPlain(this, { strategy: 'excludeAll' }), undefined, 2);
  }

  static deserialize(serialized: string): Database_v0 {
    return plainToInstance(Database_v0, JSON.parse(serialized), { excludeExtraneousValues: true });
  }

  // eslint-disable-next-line class-methods-use-this
  upgrade_version(): Database {
    throw new Error('Cannot upgrade from the latest version');
  }
}

export class FutureVersionError extends Error {
  constructor(version: string) {
    super(`Unable to handle database of a future version. Version: '${version}'. Latest compatible version: '${Database.LATEST_VERSION}'.`);

    // Extending a built-in class, manually set prototype
    Object.setPrototypeOf(this, FutureVersionError.prototype);
  }
}
