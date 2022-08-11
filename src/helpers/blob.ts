import mime from 'mime/lite';
import { None, Option, Some } from 'ts-results';
import { BaseDirectory, read_binary_file, write_binary_file } from './fs';

/**
 * Attemts to read a blob from a URL.
 *
 * @export
 * @param {URL} url The URL to retrieve the data from.
 * @return The Blob, or null if the request fails.
 */
export async function get_blob_from_url(url: URL): Promise<Option<Blob>> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return Some(blob);
  } catch {
    return None;
  }
}

/**
 * Attemts to read a blob from a file. Returns null if the file does not exist or the `allowed_mime_type`
 * RegExp does not match the mime type inferred from the file extension.
 *
 * @export
 * @param {(string | RegExp)} allowed_mime_type
 * @param {string} path e.g. '' or 'folder/subfolder/'.
 * @param {string} file_name e.g. 'file.txt'.
 * @param {BaseDirectory} base_dir
 * @param {boolean} check_exists Check if the file exists before attempting to read (requires readDir permission on the parent scope).
 * @return The file Blob, or null.
 */
export async function read_blob_from_file(allowed_mime_type: string | RegExp, path: string, file_name: string,
  base_dir: Option<BaseDirectory>, check_exists = true): Promise<Option<Blob>> {
  let mime_type: string;
  if (allowed_mime_type instanceof RegExp) {
    const mt = get_mime_type(file_name);
    if (mt.none) return None;
    if (!allowed_mime_type.test(mt.val)) return None;
    mime_type = mt.val;
  } else {
    mime_type = allowed_mime_type;
  }

  const bytes = await read_binary_file(path, file_name, base_dir, check_exists);
  if (bytes.none) return None;

  const blob = new Blob([bytes.val.buffer], { type: mime_type });
  return Some(blob);
}

/**
 * Writes a Blob to a file. Creates the directory and file if either do not already exist.
 *
 * @export
 * @param {Blob} blob The Blob to write.
 * @param {string} path e.g. '' or 'folder/subfolder/'.
 * @param {string} file_name e.g. 'file.txt'.
 * @param {BaseDirectory} base_dir
 */
export async function write_blob_to_file(blob: Blob, path: string, file_name: string, base_dir: Option<BaseDirectory>) {
  const buffer = await blob.arrayBuffer();
  write_binary_file(buffer, path, file_name, base_dir);
}

/**
 * Gets the mime type from a file path or extension.
 *
 * @export
 * @param {string} path The path or extension of a file.
 * @return The mime type, or null if one is not found.
 */
export function get_mime_type(path: string): Option<string> {
  const m = mime.getType(path);
  return m !== null ? Some(m) : None;
}
