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
    private dialog: MdDialog,) {


  }

  editRoute(route: Route) {
    this.router.navigate(['project/'+this.projectId+'/route/'+route.id+'/edit']);
  }

  deleteRoute(route: Route) {
    let dialogRef = this.dialog.open(DeleteDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.routeService.deleteRoute(route.id).subscribe(resp => {
          this.messageService.alert("Delete successfully", true);
        },
        this.messageService.error.bind(this.messageService))
      }
    });
  }

  search(event) {
    this.searchStr = event.target.value;
  }

  goToRoute(route: Route) {
    this.router.navigate(['project/'+this.projectId+'/route/'+route.id]);
  }

  newRoute() {
    this.router.navigate(['project/'+this.projectId+'/route']);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.projectId = params['id'];
      this.routeService.getRoutesByProjectId(params['id'])
    });
  }
}