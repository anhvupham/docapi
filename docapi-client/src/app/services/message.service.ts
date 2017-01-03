import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Message } from '../models/message.model';

@Injectable()
export class MessageService {
  messageChannel: Subject<Message>;

  constructor() {
    this.messageChannel = new Subject();
  }

  alert(message: string, status: boolean) {
    this.messageChannel.next(new Message(message, status));
  }

  error(resp: any) {
    let message = resp.message;
    if (!message) {
      message = JSON.parse(resp._body).message;
    }
    this.messageChannel.next(new Message(message, false));
  }
}
