import { ProjectService } from './../../services/project.service';
import { DeleteDialog } from './../dialog/dialog.component';
import { List } from 'immutable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Route } from './../../models/route.model';
import { RouteService } from './../../services/route.service';
import { MessageService } from './../../services/message.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ["./route-list.component.css"],
})
export class RouteListComponent implements OnInit {
  projectId: string;
  searchStr = "";

  constructor(private messageService: MessageService,
    private routeService: RouteService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MdDialog,
    private projectService: ProjectService) {

      this.projectService.currentProject.subscribe(project => {
        this.projectId = project.id;
        this.routeService.getRoutesByProjectId(project.id);
      });
  }

  search(event) {
    this.searchStr = event.target.value;
  }

  newRoute() {
    this.router.navigate(['project/'+this.projectId+'/route']);
  }

  deleteRoute(route: Route) {
    this.routeService.deleteRoute(route.id).subscribe(resp => {
      this.messageService.alert("Delete successfully", true);
    },
    this.messageService.error.bind(this.messageService));
  }

  ngOnInit() {
    // this.route.params.subscribe((params: Params) => {
    //   this.projectId = params['id'];
    //   this.routeService.getRoutesByProjectId(params['id'])
    // });
  }
}