import { None, Some } from 'ts-results';
import { computed, ref, Ref } from 'vue';
import Connection from '../model/Connection';
import User from '../model/User';
import { UserFlag, UserState } from '../model/enum';
import { Database } from '../database';

const db = await Database.load();

export default function use_users() {
  const users: Ref<User[]> = ref([
    {
      username: db.value.username,
      avatar: undefined,
      connection: new Connection('host', None, None),
      flags: [UserFlag.Host],
      state: UserState.Inactive,
    },
    {
      username: 'SomeUser',
      avatar: undefined,
      connection: new Connection('1.1.1.1', None, None),
      flags: [],
      state: UserState.Inactive,
    },
    {
      username: 'McSimon99',
      avatar: undefined,
      connection: new Connection('1.1.0.0', Some('Meeple'), None),
      flags: [UserFlag.Mute],
      state: UserState.Inactive,
    },
    {
      username: 'MrSuperLongName',
      avatar: undefined,
      connection: new Connection('1.1.1.2', None, None),
      flags: [],
      state: UserState.Inactive,
    },
    {
      username: 'Bob',
      avatar: undefined,
      connection: new Connection('1.3.1.2', Some('Boba'), None),
      flags: [],
      state: UserState.Inactive,
    },
    {
      username: 'GigaChad',
      avatar: undefined,
      connection: new Connection('4.3.1.2', None, None),
      flags: [],
      state: UserState.Inactive,
    },
    {
      username: 'Lauren',
      avatar: undefined,
      connection: new Connection('4.1.1.5', None, None),
      flags: [],
      state: UserState.Inactive,
    },
    {
      username: undefined,
      avatar: undefined,
      connection: new Connection('5.5.5.5', None, None),
      flags: [],
      state: UserState.Inactive,
    },
  ]);

  const host = computed(() => users.value.find((user) => user.connection.ip === 'host'));

  function call() {
    users.value.forEach((user) => {
      if (user.connection.ip === 'host') {
        user.state = UserState.Active;
        return;
      }
      user.state = UserState.Pending;
      setTimeout(() => {
        if (user.state === UserState.Pending) {
          user.state = UserState.Inactive;
        }
      }, 10000);
    });
  }

  function toggle_flag(user: User, flag: UserFlag) {
    const index = user.flags.findIndex((inner_flag) => inner_flag === flag);
    if (index > -1) {
      user.flags.splice(index, 1);
    } else {
      user.flags.push(flag);
    }
  }

  return {
    users,
    host,
    call,
    toggle_flag,
  };
}
