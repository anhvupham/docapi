import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';
import { User } from './../models/user.model';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService extends BaseService {

  constructor(private http: Http, private authService: AuthService) {
    super(authService);
  }

  register(user: User): Observable<User> {
    return this.http.post("/api/users/signup", {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: window.btoa(user.password)
    }, this.requestOptions)
      .map((response: Response) => response.json());
  }
}