import { Expose, Type } from 'class-transformer';

export default class Connection {
  @Expose() alias: string | null = null;
  @Expose() ip: string;
  @Type(() => Date)
  @Expose() last_connected: Date | null = null;

  constructor(ip: string, alias?: string, last_connected?: Date) {
    this.alias = alias ?? null;
    this.ip = ip;
    this.last_connected = last_connected ?? null;
  }
}
