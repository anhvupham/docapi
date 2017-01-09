import { DeleteDialog } from './../dialog/dialog.component';
import { MdDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from './../../models/route.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'route-action',
  template: `
    <button md-icon-button class="nav-menu" [mdMenuTriggerFor]="menu">
      <md-icon>more_horiz</md-icon>
    </button>
    <md-menu #menu="mdMenu">
      <button md-menu-item (click)="goToRoute(route)">
        <md-icon>visibility</md-icon>
        <span>View</span>
      </button>
      <button md-menu-item (click)="editRoute(route)">
        <md-icon>edit</md-icon>
        <span>Edit</span>
      </button>
      <button md-menu-item (click)="deleteRoute(route)">
        <md-icon>close</md-icon>
        <span>Delete</span>
      </button>
    </md-menu>
  `
})
export class RouteActionComponent{
  @Input() projectId: string;
  @Input() route: Route;
  @Output() deleteRouteEvent: EventEmitter<Route> = new EventEmitter();

  constructor(private router: Router, private dialog: MdDialog) {}

  editRoute(route: Route) {
    this.router.navigate(['project/'+this.projectId+'/route/'+this.route.id+'/edit']);
  }

  goToRoute(route: Route) {
    this.router.navigate(['project/'+this.projectId+'/route/'+route.id]);
  }

  deleteRoute(route: Route) {
    let dialogRef = this.dialog.open(DeleteDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRouteEvent.emit(this.route);
      }
    });
  }
}