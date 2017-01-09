import { ProjectService } from './../../services/project.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  private _projectId: string;

  constructor(private messageService: MessageService,
              private routeService: RouteService,
              private route: ActivatedRoute,
              private projectService: ProjectService,
              private router: Router
              ) { }

  deleteRoute(route: Route) {
    this.routeService.deleteRoute(route.id).subscribe(resp => {
      this.messageService.alert("Delete successfully", true);
      this.router.navigate(["project", this._projectId]);
    },
    this.messageService.error.bind(this.messageService));
  }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      return this.routeService.getRoute(params["routeId"]);
    }).subscribe((route: Route) => {
      this.data = route;
    });

    this.projectService.currentProject.subscribe(project => {
      this._projectId = project.id;
    });
  }

}
