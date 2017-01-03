import { AuthService } from './auth.service';
import { Headers, RequestOptions } from '@angular/http';

export class BaseService {
  protected requestOptions: RequestOptions;

  constructor(authService: AuthService) {
    let headers= new Headers({
      "Application-Content": "application/json",
    });
    if (authService.token) {
      headers.append("Authentication", "Bearer " + authService.token)
    }
    this.requestOptions = new RequestOptions({headers: headers});
  }
}