import { MessageService } from './../../services/message.service';
import { Route } from './../../models/route.model';
import { ActivatedRoute, Params } from '@angular/router';
import { RouteService } from './../../services/route.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-route-edit',
  templateUrl: './route-edit.component.html',
  styleUrls: ['./route-edit.component.css']
})
export class RouteEditComponent implements OnInit {
  private data: Route = new Route();
  private projectId: string;

  constructor(
    private routeService: RouteService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      this.projectId = params['id'];
      return this.routeService.getRoute(params['routeId']);
    }).subscribe((route: Route) => {
      this.data = route;
    },
    resp => console.log(resp));
  }

  autoSave(formValue) {
    this.routeService.updateRoute(new Route(formValue)).subscribe(resp => {
      this.messageService.alert("Auto saved successfully", true);
    }, 
    this.messageService.error.bind(this.messageService));
  }

}
