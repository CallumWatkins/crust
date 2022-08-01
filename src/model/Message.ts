export default class Message {
  id: string;
  sender: string;
  message: string;
  date: Date;

  constructor(
    id: string,
    sender: string,
    message: string,
    date: Date,
  ) {
    this.id = id;
    this.sender = sender;
    this.message = message;
    this.date = date;
  }
}
