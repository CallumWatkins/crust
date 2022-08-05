import {
  readDir, readTextFile, BaseDirectory, FileEntry, createDir, writeTextFile, readBinaryFile, writeBinaryFile, BinaryFileContents, removeFile,
} from '@tauri-apps/api/fs';
import { None, Option, Some } from 'ts-results';

export { BaseDirectory };

/**
 * Checks if a file exists.
 * Requires readDir permission on the `path` scope.
 *
 * @export
 * @param {string} path e.g. '' or 'folder/subfolder/'.
 * @param {string} file_name e.g. 'file.txt'.
 * @param {BaseDirectory} base_dir
 * @return True if the file exists, otherwise false.
 */
export async function file_exists(path: string, file_name: string, base_dir: Option<BaseDirectory>): Promise<boolean> {
  try {
    const entries: FileEntry[] = await readDir(path, { dir: base_dir.unwrapOr(undefined) });
    return entries.some((e) => e.name === file_name);
  } catch {
    return false;
  }
}

/**
 * Attemts to read a text file. Returns null if the file does not exist.
 *
 * @export
 * @param {string} path e.g. '' or 'folder/subfolder/'.
 * @param {string} file_name e.g. 'file.txt'.
 * @param {BaseDirectory} base_dir
 * @return The content of the file, or null if the file does not exist.
 */
export async function read_text_file(path: string, file_name: string, base_dir: Option<BaseDirectory>): Promise<Option<string>> {
  return await file_exists(path, file_name, base_dir)
    ? Some(await readTextFile(path + file_name, { dir: base_dir.unwrapOr(undefined) }))
    : None;
}

/**
 * Writes to a text file. Creates the directory and file if either do not already exist.
 *
 * @export
 * @param {string} contents The contents to write.
 * @param {string} path e.g. '' or 'folder/subfolder/'.
 * @param {string} file_name e.g. 'file.txt'.
 * @param {BaseDirectory} base_dir
 */
export async function write_text_file(contents: string, path: string, file_name: string, base_dir: Option<BaseDirectory>) {
  await createDir(path, { dir: base_dir.unwrapOr(undefined), recursive: true });
  await writeTextFile(path + file_name, contents, { dir: base_dir.unwrapOr(undefined) });
}

/**
 * Attemts to read a binary file. Returns null if the file does not exist.
 *
 * @export
 * @param {string} path e.g. '' or 'folder/subfolder/'.
 * @param {string} file_name e.g. 'file.txt'.
 * @param {BaseDirectory} base_dir
 * @param {boolean} check_exists Check if the file exists before attempting to read (requires readDir permission on the parent scope).
 * @return The content of the file, or null if the file does not exist.
 */
export async function read_binary_file(path: string, file_name: string, base_dir: Option<BaseDirectory>, check_exists = true):
Promise<Option<Uint8Array>> {
  if (check_exists && !(await file_exists(path, file_name, base_dir))) return None;
  return Some(await readBinaryFile(path + file_name, { dir: base_dir.unwrapOr(undefined) }));
}

/**
 * Writes to a binary file. Creates the directory and file if either do not already exist.
 *
 * @export
 * @param {BinaryFileContents} contents The contents to write.
 * @param {string} path e.g. '' or 'folder/subfolder/'.
 * @param {string} file_name e.g. 'file.txt'.
 * @param {BaseDirectory} base_dir
 */
export async function write_binary_file(contents: BinaryFileContents, path: string, file_name: string, base_dir: Option<BaseDirectory>) {
  await createDir(path, { dir: base_dir.unwrapOr(undefined), recursive: true });
  await writeBinaryFile(path + file_name, contents, { dir: base_dir.unwrapOr(undefined) });
}

/**
 * Delete a file.
 *
 * @export
 * @param {string} path e.g. '' or 'folder/subfolder/'.
 * @param {string} file_name e.g. 'file.txt'.
 * @param {BaseDirectory} base_dir
 */
export async function delete_file(path: string, file_name: string, base_dir: Option<BaseDirectory>) {
  await removeFile(path + file_name, { dir: base_dir.unwrapOr(undefined) });
}
