import { Observable } from 'rxjs/Observable';
import { Route } from './../../models/route.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.css']
})
export class RouteFormComponent {
  private form: FormGroup;
  private data: Route = new Route();

  @Input()
  set route(data: Route) {
    this.data = data;
    this.form.patchValue({
      id: data.id,
      path: data.path,
      method: data.method,
      requestHeader: data.requestHeader,
      requestBody: data.requestBody,
      responseSuccessHeader: data.responseSuccessHeader,
      responseSuccessBody: data.responseSuccessBody,
      responseFailHeader: data.responseFailHeader,
      responseFailBody: data.responseFailBody,
    });
  }

  @Output() formSubmit = new EventEmitter();

  @Input()
  set projectId(id: string) {
    this.form.patchValue({
      project: id
    });
  }

  @Input() readOnly: boolean;

  @Input() editMode: boolean;
  
  private methods: any[] = [{
    value: 'POST'
  }, {
    value: 'GET'
  }, {
    value: 'PUT'
  }, {
    value: 'DELETE'
  }];
  
  constructor(private fb: FormBuilder) { 
    this.form = fb.group({
      id: "",
      path: [this.data.path, Validators.required],
      method: [this.data.method, Validators.required],
      requestHeader: [this.data.requestHeader, Validators.required],
      requestBody: [this.data.requestBody, Validators.required],
      responseSuccessHeader: [this.data.responseSuccessHeader, Validators.required],
      responseSuccessBody: [this.data.responseSuccessBody, Validators.required],
      responseFailHeader: [this.data.responseFailHeader, Validators.required],
      responseFailBody: [this.data.responseFailBody, Validators.required],
      project: ""
    });

    this.form.valueChanges.debounceTime(500).skip(1).subscribe(value => {
      this.formSubmit.emit(value);
    });
  }

  onChange(value, type) {
    this.form.patchValue({
      [type]: value
    });
  }
}