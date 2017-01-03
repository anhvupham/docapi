import { ActivatedRoute, Params } from '@angular/router';
import { RouteService } from './../../services/route.service';
import { MessageService } from './../../services/message.service';
import { Route } from './../../models/route.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-route-view',
  templateUrl: './route-view.component.html',
  styleUrls: ['./route-view.component.css']
})
export class RouteViewComponent implements OnInit {

  private data: Route = new Route();

  constructor(private messageService: MessageService,
              private routeService: RouteService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      return this.routeService.getRoute(params["routeId"]);
    }).subscribe((route: Route) => {
      this.data = route;
    });
  }

}
