import { connections_setting } from '../model/Setting';
import Connection from '../model/Connection';
import { sort_by_property } from '../helpers/sort';

// eslint-disable-next-line import/prefer-default-export
export function use_connections() {
  function get_recent_connections() {
    return [...connections_setting.value]
      .filter((conn) => conn.last_connected !== null)
      .sort(sort_by_property<Connection>('last_connected', false))
      .slice(0, 5);
  }

  function find_connection(conn: Connection) {
    return connections_setting.value.findIndex((connection) => connection.ip === conn.ip);
  }

  function add_connection(conn: Connection) {
    connections_setting.value.push(conn);
    connections_setting.save();
  }

  function delete_connection(conn: Connection) {
    const index = find_connection(conn);
    if (index >= 0) {
      connections_setting.value.splice(index, 1);
      connections_setting.save();
    }
  }

  return {
    get_recent_connections,
    add_connection,
    delete_connection,
  };
}
