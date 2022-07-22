import { ref, Ref } from "vue";

export interface Connection {
  alias: string | null,
  ip: string,
  last_connected: Date | null,
};

export function use_connections() {
  const connections: Ref<Connection[]> = ref([
    {
      alias: "John Doe",
      ip: "206.15.168.235",
      last_connected: new Date("2022-01-16"),
    },
    {
      alias: "James Smith",
      ip: "3.66.149.79",
      last_connected: new Date("2022-03-22"),
    },
    {
      alias: null,
      ip: "62.109.37.164",
      last_connected: null,
    },
    {
      alias: null,
      ip: "34.61.123.222",
      last_connected: null,
    },
    {
      alias: null,
      ip: "215.4.207.51",
      last_connected: new Date("2022-04-01"),
    },
    {
      alias: "Charles Smith",
      ip: "39.6.121.89",
      last_connected: new Date("2022-05-12"),
    },
  ]);
  
  const recent_connections: Ref<Connection[]> = ref([
    {
      alias: "Raveena Adkins",
      ip: "175.157.72.251",
      last_connected: null,
    },
    {
      alias: "Skye Willis",
      ip: "11.77.205.157",
      last_connected: null,
    },
    connections.value[0],
    connections.value[2],
    connections.value[3],
  ]);
  
  function find_connection(conn: Connection) {
    return connections.value.findIndex(connection => {
      return connection.ip == conn.ip;
    });
  }
  
  function add_connection(conn: Connection) {
    connections.value.push(conn);
  }
  
  function delete_connection(conn: Connection) {
    const index = find_connection(conn);
    if(index >= 0) {
      connections.value.splice(index, 1);
    }
  }
  
  function update_connection(conn: Connection) {
    const index = find_connection(conn);
    if(index >= 0) {
      connections.value[index].alias = conn.alias;
      connections.value[index].ip = conn.ip;
    }
  }

  return {
    connections, 
    recent_connections,
    add_connection,
    delete_connection,
    update_connection,
  }
}
