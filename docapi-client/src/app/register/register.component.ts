import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';
import { MessageService } from './../services/message.service';
import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  private user: User;

  constructor(private messageService: MessageService, 
              private userService: UserService, 
              private authService: AuthService,
              private router:Router) { }

  register(e) {
    e.preventDefault();
    this.userService.register(this.user).subscribe(
      resp => {
        this.messageService.alert("Register successfully", true);
        let token = resp.token;
        this.authService.token = token;
        localStorage.setItem('currentUser', JSON.stringify({ username: this.user.username, token: token }));
        this.router.navigate([""]);
      },
      this.messageService.error.bind(this.messageService)
    );
  }

  ngOnInit() {
    this.user = new User();
  }

}
