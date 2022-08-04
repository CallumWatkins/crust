import { ref, Ref } from 'vue';
import Connection from '../model/Connection';
import User from '../model/User';
import { UserFlag, UserState } from '../model/enum';

export default function use_users() {
  const users: Ref<User[]> = ref([
    {
      username: 'MrFishHead',
      avatar: undefined,
      connection: new Connection('host'),
      flags: [UserFlag.Host],
      state: UserState.Inactive,
    },
    {
      username: 'TheWatkinator',
      avatar: undefined,
      connection: new Connection('1.1.1.1'),
      flags: [],
      state: UserState.Inactive,
    },
    {
      username: 'McSimon99',
      avatar: undefined,
      connection: new Connection('1.1.0.0', 'Meeple'),
      flags: [UserFlag.Mute],
      state: UserState.Inactive,
    },
    {
      username: 'MrSuperLongName',
      avatar: undefined,
      connection: new Connection('1.1.1.2'),
      flags: [],
      state: UserState.Inactive,
    },
    {
      username: 'Bob',
      avatar: undefined,
      connection: new Connection('1.3.1.2', 'Boba'),
      flags: [],
      state: UserState.Inactive,
    },
    {
      username: 'GigaChad',
      avatar: undefined,
      connection: new Connection('4.3.1.2'),
      flags: [],
      state: UserState.Inactive,
    },
    {
      username: 'Lauren',
      avatar: undefined,
      connection: new Connection('4.1.1.5'),
      flags: [],
      state: UserState.Inactive,
    },
    {
      username: undefined,
      avatar: undefined,
      connection: new Connection('5.5.5.5'),
      flags: [],
      state: UserState.Inactive,
    },
  ]);

  function call() {
    users.value.forEach((user) => {
      user.state = UserState.Pending;
      setTimeout(() => {
        if (user.state === UserState.Pending) {
          user.state = UserState.Inactive;
        }
      }, 10000);
    });
  }

  return {
    users,
    call,
  };
}
