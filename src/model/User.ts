import { UserFlag, UserState } from './enum';
import Connection from './Connection';

export default interface User {
  username?: string;
  avatar?: string;
  connection: Connection;
  flags: UserFlag[];
  state: UserState;
// eslint-disable-next-line semi
}
