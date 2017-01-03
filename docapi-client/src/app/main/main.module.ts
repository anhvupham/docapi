import { RouteFormComponent } from './route-form/route-form.component';
import { FilterRoute, Reverse } from './../pipes/util.pipe';
import { RouteNewComponent } from './route-new/route-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { NewProjectComponent } from './new-project/new-project.component';
import { AuthGuard } from './../services/gaurd.service';
import { RouteListComponent } from './route-list/route-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';
import { AceEditorDirective } from 'ng2-ace-editor';
import { RouteViewComponent } from './route-view/route-view.component';
import { RouteEditComponent } from './route-edit/route-edit.component';

const routes: Routes = [
  { 
    path: '', component: MainComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'project/:id/route/:routeId/edit', component: RouteEditComponent },
      { path: 'project/:id/route/:routeId', component: RouteViewComponent },
      { path: 'project/:id/route', component: RouteNewComponent },
      { path: 'project/:id', component: RouteListComponent },
      { path: 'project', component: NewProjectComponent},
    ]
  },
];

@NgModule({
  declarations: [
    RouteListComponent, 
    NewProjectComponent,
    RouteNewComponent,
    AceEditorDirective,
    FilterRoute,
    RouteFormComponent,
    RouteViewComponent,
    Reverse,
    RouteEditComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule.forRoot(),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule
  ],
})
export class MainModule { }
