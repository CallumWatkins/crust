import { UserFlag } from './enum';
import Connection from './Connection';

export default interface User {
  username?: string;
  avatar?: string;
  connection: Connection;
  flags: UserFlag[];
// eslint-disable-next-line semi
}
