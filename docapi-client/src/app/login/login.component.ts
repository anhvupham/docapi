import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService, private messageService: MessageService, private router:Router) { }

  login() {
    this.authService.login(this.user).subscribe(
      resp => {
        this.messageService.alert("Login successfully", true);
        this.router.navigate([""]);
      },
      this.messageService.error.bind(this.messageService));
  }

  ngOnInit() {
    this.user = new User();
  }
}
