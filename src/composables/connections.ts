import { connections_setting } from '../model/Setting';
import Connection from '../model/Connection';

// eslint-disable-next-line import/prefer-default-export
export function use_connections() {
  const recent_connections: Ref<Connection[]> = ref([
    {
      alias: 'Raveena Adkins',
      ip: '175.157.72.251',
      last_connected: null,
    },
    {
      alias: 'Skye Willis',
      ip: '11.77.205.157',
      last_connected: null,
    },
    connections.value[0],
    connections.value[2],
    connections.value[3],
  ]);

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
    recent_connections,
    add_connection,
    delete_connection,
  };
}
