import { None, Some } from 'ts-results';
import { ref, Ref } from 'vue';
import Connection from '../model/Connection';
import { UserFlag } from '../model/enum';

export interface User {
  username?: string;
  avatar?: string;
  connection: Connection;
  flags: UserFlag[];
}

export function use_users() {
  const users: Ref<User[]> = ref([
    {
      username: 'MrFishHead',
      avatar: undefined,
      connection: new Connection('0.0.0.0', None, None),
      flags: [UserFlag.Host],
    },
    {
      username: 'TheWatkinator',
      avatar: undefined,
      connection: new Connection('1.1.1.1', None, None),
      flags: [],
    },
    {
      username: 'McSimon99',
      avatar: undefined,
      connection: new Connection('1.1.0.0', Some('Meeple'), None),
      flags: [UserFlag.Mute],
    },
    {
      username: 'MrSuperLongName',
      avatar: undefined,
      connection: new Connection('1.1.1.2', None, None),
      flags: [],
    },
    {
      username: 'Bob',
      avatar: undefined,
      connection: new Connection('1.3.1.2', Some('Boba'), None),
      flags: [],
    },
    {
      username: 'GigaChad',
      avatar: undefined,
      connection: new Connection('4.3.1.2', None, None),
      flags: [],
    },
    {
      username: 'Lauren',
      avatar: undefined,
      connection: new Connection('4.1.1.5', None, None),
      flags: [],
    },
    {
      username: undefined,
      avatar: undefined,
      connection: new Connection('5.5.5.5', None, None),
      flags: [],
    },
  ]);

  return {
    users,
  };
}
