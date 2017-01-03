import { MessageService } from './../../services/message.service';
import { AuthService } from './../../services/auth.service';
import { ProjectService } from './../../services/project.service';
import { Project } from './../../models/project.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-project',
  templateUrl: './new-project.component.html',
  styles: [
    `md-card-actions {
      text-align: center
    }`
  ]
})
export class NewProjectComponent {
  name: string;

  constructor(private projectService: ProjectService, private messageService: MessageService) { 

  }

  submit() {
    this.projectService.newProject(this.name).subscribe(
      resp => {
        this.messageService.alert("Save successfully", true);
        this.name = "";
      }, 
      this.messageService.error.bind(this.messageService));
  }
}