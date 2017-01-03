import { Route } from './route.model';

export class Project {
  name: string;
  id: string;
  routes: Array<Route>;
  
  constructor(data?: any) {
    if (!data) return;
    this.name = data.name;
    this.id = data.id;
    this.routes = data.routes;
  }
}
