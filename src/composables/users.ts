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
      connection: new Connection('0.0.0.0'),
      flags: [UserFlag.Host],
    },
    {
      username: 'TheWatkinator',
      avatar: undefined,
      connection: new Connection('1.1.1.1'),
      flags: [],
    },
    {
      username: 'McSimon99',
      avatar: undefined,
      connection: new Connection('1.1.0.0', 'Meeple'),
      flags: [UserFlag.Mute],
    },
    {
      username: 'MrSuperLongName',
      avatar: undefined,
      connection: new Connection('1.1.1.2'),
      flags: [],
    },
    {
      username: 'Bob',
      avatar: undefined,
      connection: new Connection('1.3.1.2', 'Boba'),
      flags: [],
    },
    {
      username: 'GigaChad',
      avatar: undefined,
      connection: new Connection('4.3.1.2'),
      flags: [],
    },
    {
      username: 'Lauren',
      avatar: undefined,
      connection: new Connection('4.1.1.5'),
      flags: [],
    },
    {
      username: undefined,
      avatar: undefined,
      connection: new Connection('5.5.5.5'),
      flags: [],
    },
  ]);

  return {
    users,
  };
}
