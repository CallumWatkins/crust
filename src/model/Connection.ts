import { Expose, Transform, Type } from 'class-transformer';
import { Option } from 'ts-results';
import { option_to_class, option_to_plain } from '../database/transformers';

export default class Connection {
  @Transform(...option_to_class)
  @Transform(...option_to_plain)
  @Type(() => String)
  @Expose()
    alias: Option<string>;

  @Expose()
    ip: string;

  @Transform(...option_to_class)
  @Transform(...option_to_plain)
  @Type(() => Date)
  @Expose()
    last_connected: Option<Date>;

  constructor(ip: string, alias: Option<string>, last_connected: Option<Date>) {
    this.alias = alias;
    this.ip = ip;
    this.last_connected = last_connected;
  }
}
