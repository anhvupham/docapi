import { Component } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { MessageService } from './services/message.service';
import { Message } from './models/message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private snackBar: MdSnackBar, private messageService: MessageService) {
    this.messageService.messageChannel.subscribe((message: Message) => {
      if (message.status) {
        this.snackBar.open(message.text, "close", {
          duration: 3000
        });
      } else {
        this.snackBar.open(message.text, "close");
      }
    });
  }
}
