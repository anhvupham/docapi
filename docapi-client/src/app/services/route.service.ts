import { List } from 'immutable';
import { Route } from './../models/route.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response } from '@angular/http';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RouteService extends BaseService {

  private _routes: BehaviorSubject<List<Route>> = new BehaviorSubject(List([]));

  get routes() {
    return this._routes.asObservable();
  }

  constructor(private http: Http,
        private authService: AuthService,
        private messageService: MessageService) { 

    super(authService);
  }

  updateRoute(route: Route): Observable<any> {
    return this.http.put('/api/routes/' + route.id, route, this.requestOptions)
          .map((resp:Response) => resp.json());
  }

  deleteRoute(id: string): Observable<any> {
    let obs = this.http.delete('/api/routes/' + id, this.requestOptions)
              .map((resp: Response) => resp.json()).share();

    obs.subscribe(resp => {
      let routes = this._routes.getValue().filter((route:Route) => route.id !== id).toList();
      this._routes.next(routes);
    },
    resp => console.log(resp));

    return obs;
  }

  getRoute(id: string): Observable<Route> {
    return this.http.get('/api/routes/' + id, this.requestOptions)
              .map((resp: Response) => new Route(resp.json()));
  }

  addRoute(route:Route): Observable<any> {
    let obs = this.http.post('/api/routes', route, this.requestOptions)
            .map((resp:Response) => resp.json()).share();

    return obs;
  }

  getRoutesByProjectId(id: string) {
    let cond = {project: id};
    this.http.get('/api/routes?where='+ JSON.stringify(cond), this.requestOptions)
              .map((resp: Response) => resp.json() as Route[])
              .subscribe((resp) => {
                this._routes.next(List(resp));
              },
              resp => console.log(resp));
  }
}