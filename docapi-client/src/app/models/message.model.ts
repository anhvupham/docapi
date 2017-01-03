export class Message {
  text: string;
  status: boolean;
  constructor(message: string, status: boolean) {
    this.text = message;
    this.status = status;
  }
}
