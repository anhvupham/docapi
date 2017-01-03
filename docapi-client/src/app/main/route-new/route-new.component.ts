import { Router, ActivatedRoute, Params } from '@angular/router';
import { MessageService } from './../../services/message.service';
import { RouteService } from './../../services/route.service';
import { Route } from './../../models/route.model';
import { Subject } from 'rxjs/Subject';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'route-new',
  templateUrl: './route-new.component.html',
  styleUrls: ['./route-new.component.css']
})
export class RouteNewComponent implements OnInit {
  private projectId: string;

  constructor(
    private fb: FormBuilder,
    private routeService: RouteService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  formSubmit(event) {
    this.routeService.addRoute(event).subscribe(
      resp => {
        this.messageService.alert("Save successfully", true);
        this.router.navigate(["project", event.project]);
      },
      this.messageService.error.bind(this.messageService)
    );
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.projectId = params['id'];
    });
  }
}