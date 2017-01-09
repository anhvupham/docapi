import { Observable } from 'rxjs';
import { List } from 'immutable';
import { RouteService } from './../services/route.service';
import { Subject } from 'rxjs/Subject';
import { MessageService } from './../services/message.service';
import { Project } from './../models/project.model';
import { ProjectService } from './../services/project.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { DeleteDialog, LogoutDialog } from './dialog/dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ProjectService, RouteService],
})
export class MainComponent implements OnInit {
  private isMobile: boolean;
  private navMode: string;
  private pageTitle = "Welcome to Docapi !"
  private viewProject: Project;
  private form: FormGroup;
  private editMode: boolean;
  private obsState: Subject<any> = new Subject();

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MdDialog,
    private projectService: ProjectService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private route: ActivatedRoute) {

    this.form = this.fb.group({
      projectName: ["", Validators.required]
    });

    this.obsState.subscribe(state => {
      let type = state.type;
      switch (type) {
        case "NEW_PROJECT":
          this.editMode = false;
          this.pageTitle = "New Project";
          this.viewProject = null;
          this.router.navigate(["project"]);
          break;
        case "REMOVE_PROJECT":
          this.pageTitle = "Welcome to Docapi !";
          this.router.navigate([""]);
          break;
        case "SELECT_PROJECT":
          let project = state.value;
          this.editMode = false;
          this.pageTitle = project.name;
          this.viewProject = project;
          this.projectService.setCurrentProject(project);
          break;
        case "NAVIGATE_PROJECT":
          this.router.navigate(["project", state.value]);
          break;
        case "EDIT_PROJECT":
          this.editMode = true;
          break;
        case "EXIT_EDIT_PROJECT":
          this.editMode = false;
          break;
        default:
          break;
      }
    });
  }

  exitEditProject() {
    this.obsState.next({ type: "EXIT_EDIT_PROJECT" });
  }

  editProject() {
    this.obsState.next({ type: "EDIT_PROJECT" });
    this.form = this.fb.group({
      projectName: [this.viewProject.name, Validators.required]
    });

    this.form.valueChanges.filter(value => this.form.valid).debounceTime(1000).subscribe(value => {
      this.projectService.updateProject(value.projectName, this.viewProject.id).subscribe(resp => {
        this.pageTitle = value.projectName;
        this.messageService.alert("Save successfully", true);
      },
        this.messageService.error.bind(this.messageService))
    });
  }

  removeProject() {
    let dialogRef = this.dialog.open(DeleteDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.deleteProject(this.viewProject.id).subscribe(resp => {
          this.messageService.alert("Deleted successfully", true);
          this.obsState.next({ type: "REMOVE_PROJECT" });
        })
      }
    });
  }

  newProject() {
    this.obsState.next({ type: "NEW_PROJECT" });
  }

  loadRoute(project) {
    this.obsState.next({ type: "SELECT_PROJECT", value: project });
    this.obsState.next({ type: "NAVIGATE_PROJECT", value: project.id });
  }

  ngOnInit() {
    let size = window.innerWidth;
    this.isMobile = (size <= 768);
    this.navMode = size <= 768 ? "over" : "side";
  
    if (this.route.firstChild) {
      Observable.combineLatest(this.route.firstChild.params, this.projectService.projects, (params: Params, projects: Array<Project>) => {
        let data = {
          params: params,
          projects: projects
        }
        return data;
      })
      .subscribe(data => {
        if (data.projects.length > 0) {
          let currProject = data.projects.find((project: Project) => {
            return project.id === data.params['id'];
          });
          if (currProject) {
            this.obsState.next({type: "SELECT_PROJECT", value: currProject});
          }
        } 
      });
    }
  }

  logout() {
    let dialogRef = this.dialog.open(LogoutDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.logout();
        this.router.navigate(["/login"]);
      }
    });
  }
}

