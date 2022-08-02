import { load_avatar } from './avatar';

export default async function init() {
  const task_load_avatar = load_avatar();

  await Promise.all([
    task_load_avatar,
  ]);
}
