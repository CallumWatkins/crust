import mime from 'mime/lite';

export function get_mime_type(path: string): string | null {
  return mime.getType(path);
}
