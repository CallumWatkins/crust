import { ref, Ref, watch } from 'vue';
import Connection from '../model/Connection';
import User from '../model/User';
import { UserFlag } from '../model/enum';

export default function use_users() {
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

  const active_users: Ref<User[]> = ref([]);
  const pending_users: Ref<User[]> = ref([]);

  watch(
    () => pending_users.value,
    (newVal, oldVal) => {
      const difference = newVal.filter((x) => !oldVal.includes(x));
      difference.forEach((user) => {
        setTimeout(() => {
          const index = pending_users.value.findIndex((inner_user) => inner_user.connection.ip === user.connection.ip);
          pending_users.value.splice(index, 1);
        }, 10000);
      });
    },
  );

  return {
    users,
    active_users,
    pending_users,
  };
}
