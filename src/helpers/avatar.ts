import { open } from '@tauri-apps/api/dialog';
import { Ok, Err, Result, Some, None } from 'ts-results';
import { read_blob_from_file, write_blob_to_file, get_mime_type } from './blob';
import { BaseDirectory, delete_file } from './fs';
import { Database } from '../database';
import { use_object_url_store } from '../stores/objects';

const object_url_store = use_object_url_store();
const db = await Database.load();

const ALLOWED_FILE_EXTENSIONS = ['jpeg', 'jpg', 'png', 'webp', 'gif', 'svg', 'bmp'];
const MAX_FILE_SIZE_BYTES = 8 * 1000 * 1000;
const FILE_NAME = 'avatar';

/**
 * Load the current avatar into the object URL store.
 *
 * @export
 */
export async function load_avatar() {
  const ext = db.value.avatar_file_ext;
  if (ext.none) return;
  const mime_type = get_mime_type(ext.val);
  if (mime_type.none) return;
  const blob = await read_blob_from_file(mime_type.val, '', `${FILE_NAME}.${ext}`, Some(BaseDirectory.App));
  if (blob.none) return;
  object_url_store.create('avatar-image-host', blob.val);
}

/**
 * Prompt the user to select a new avatar image.
 *
 * @export
 * @return True if a new avatar is set, false if the user cancelled the operation, error message otherwise.
 */
export async function set_new_avatar(): Promise<Result<boolean, string>> {
  const selected: string | string[] | null = await open({
    filters: [{
      name: 'Image',
      extensions: ALLOWED_FILE_EXTENSIONS,
    }],
  });

  if (selected === null) return Ok(false);

  const full_path = Array.isArray(selected) ? selected[0] : selected;
  const is_valid = await is_valid_avatar_image(full_path);
  if (!is_valid.ok) return Err(is_valid.val);

  const image_blob: Blob = is_valid.val;
  const ext = full_path.substring(full_path.lastIndexOf('.') + 1).toLowerCase();
  await delete_current_avatar_image();
  write_blob_to_file(image_blob, '', `${FILE_NAME}.${ext}`, Some(BaseDirectory.App));
  db.value.avatar_file_ext = Some(ext);
  db.value.save();
  object_url_store.create('avatar-image-host', image_blob);
  return Ok(true);
}

/**
 * Check if an image is a valid avatar.
 *
 * @param {string} full_path
 * @return The image Blob if it is valid, error message otherwise.
 */
async function is_valid_avatar_image(full_path: string): Promise<Result<Blob, string>> {
  const file_name_start_index = Math.max(full_path.lastIndexOf('\\'), full_path.lastIndexOf('/')) + 1;
  const path = file_name_start_index === 0 ? '' : full_path.substring(0, file_name_start_index);
  const file_name = full_path.substring(file_name_start_index);

  const blob = await read_blob_from_file(/^image\//, path, file_name, None, false);
  if (blob.none) return Err('Not a valid image!');
  if (blob.val.size > MAX_FILE_SIZE_BYTES) return Err(`File too large (> ${MAX_FILE_SIZE_BYTES / (1000 * 1000)}MB)`);

  const url = object_url_store.create('new-avatar-image-host', blob.val);
  const valid = await new Promise<boolean>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = url;
  });

  object_url_store.revoke('new-avatar-image-host');

  if (!valid) return Err('Not a valid image!');
  return Ok(blob.val);
}

/**
 * Delete the current avatar image.
 */
async function delete_current_avatar_image() {
  const ext = db.value.avatar_file_ext;
  if (ext.none) return;

  try {
    await delete_file('', `${FILE_NAME}.${ext}`, Some(BaseDirectory.App));
  } catch {
    // not a problem
  }
}
