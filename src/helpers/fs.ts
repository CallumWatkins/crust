import {
  readDir, readTextFile, BaseDirectory, FileEntry, createDir, writeTextFile, readBinaryFile, writeBinaryFile, BinaryFileContents,
} from '@tauri-apps/api/fs';

export { BaseDirectory };

/**
 * Checks if a file exists.
 *
 * @export
 * @param {BaseDirectory} base_dir
 * @param {string} path e.g. 'folder/subfolder'.
 * @param {string} file_name e.g. 'file.txt'.
 * @return True if the file exists, otherwise false.
 */
export async function file_exists(base_dir: BaseDirectory, path: string, file_name: string): Promise<boolean> {
  try {
    const entries: FileEntry[] = await readDir(path, { dir: base_dir });
    return entries.some((e) => e.name === file_name);
  } catch {
    return false;
  }
}

/**
 * Attemts to read a text file. Returns null if the file does not exist.
 *
 * @export
 * @param {BaseDirectory} base_dir
 * @param {string} path e.g. 'folder/subfolder'.
 * @param {string} file_name e.g. 'file.txt'.
 * @return The content of the file, or null if the file does not exist.
 */
export async function read_text_file(base_dir: BaseDirectory, path: string, file_name: string): Promise<string | null> {
  return await file_exists(base_dir, path, file_name)
    ? readTextFile(path + file_name, { dir: base_dir })
    : null;
}

/**
 * Writes to a text file. Creates the directory and file if either do not already exist.
 *
 * @export
 * @param {BaseDirectory} base_dir
 * @param {string} path e.g. 'folder/subfolder'.
 * @param {string} file_name e.g. 'file.txt'.
 * @param {string} contents The contents to write.
 */
export async function write_text_file(base_dir: BaseDirectory, path: string, file_name: string, contents: string) {
  await createDir(path, { dir: base_dir, recursive: true });
  await writeTextFile(path + file_name, contents, { dir: base_dir });
}

/**
 * Attemts to read a binary file. Returns null if the file does not exist.
 *
 * @export
 * @param {BaseDirectory} base_dir
 * @param {string} path e.g. 'folder/subfolder'.
 * @param {string} file_name e.g. 'file.txt'.
 * @return The content of the file, or null if the file does not exist.
 */
export async function read_binary_file(base_dir: BaseDirectory, path: string, file_name: string): Promise<Uint8Array | null> {
  return await file_exists(base_dir, path, file_name)
    ? readBinaryFile(path + file_name, { dir: base_dir })
    : null;
}

/**
 * Writes to a binary file. Creates the directory and file if either do not already exist.
 *
 * @export
 * @param {BaseDirectory} base_dir
 * @param {string} path e.g. 'folder/subfolder'.
 * @param {string} file_name e.g. 'file.txt'.
 * @param {BinaryFileContents} contents The contents to write.
 */
export async function write_binary_file(base_dir: BaseDirectory, path: string, file_name: string, contents: BinaryFileContents) {
  await createDir(path, { dir: base_dir, recursive: true });
  await writeBinaryFile(path + file_name, contents, { dir: base_dir });
}
