import { isPermissionGranted, requestPermission, sendNotification, Options } from '@tauri-apps/api/notification';
import { appWindow, UserAttentionType } from '@tauri-apps/api/window';
import { None, Option } from 'ts-results';

export type { Options as NotificationOptions };

export async function send_notification(options: Options, request_attention: Option<UserAttentionType> = None) {
  let permissionGranted = await isPermissionGranted();
  if (!permissionGranted) {
    const permission = await requestPermission();
    permissionGranted = permission === 'granted';
  }
  if (permissionGranted) sendNotification(options);
  if (request_attention.some) appWindow.requestUserAttention(request_attention.val);
}
