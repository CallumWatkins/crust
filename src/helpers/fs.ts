import {
  readDir, readTextFile, BaseDirectory, FileEntry, createDir, writeTextFile, readBinaryFile, writeBinaryFile, BinaryFileContents,
} from '@tauri-apps/api/fs';

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
export async function file_exists(path: string, file_name: string, base_dir?: BaseDirectory): Promise<boolean> {
  try {
    const entries: FileEntry[] = await readDir(path, base_dir == null ? undefined : { dir: base_dir });
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
export async function read_text_file(path: string, file_name: string, base_dir?: BaseDirectory): Promise<string | null> {
  return await file_exists(path, file_name, base_dir)
    ? readTextFile(path + file_name, base_dir == null ? undefined : { dir: base_dir })
    : null;
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
export async function write_text_file(contents: string, path: string, file_name: string, base_dir?: BaseDirectory) {
  await createDir(path, { dir: base_dir, recursive: true });
  await writeTextFile(path + file_name, contents, base_dir == null ? undefined : { dir: base_dir });
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
export async function read_binary_file(path: string, file_name: string, base_dir?: BaseDirectory, check_exists = true):
Promise<Uint8Array | null> {
  if (check_exists && !(await file_exists(path, file_name, base_dir))) return null;
  return readBinaryFile(path + file_name, base_dir == null ? undefined : { dir: base_dir });
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
export async function write_binary_file(contents: BinaryFileContents, path: string, file_name: string, base_dir?: BaseDirectory) {
  await createDir(path, { dir: base_dir, recursive: true });
  await writeBinaryFile(path + file_name, contents, base_dir == null ? undefined : { dir: base_dir });
}
