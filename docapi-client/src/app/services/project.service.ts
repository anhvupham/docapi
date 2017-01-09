import { Project } from './../models/project.model';
import { MessageService } from './message.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { BaseService } from './base.service';
import { Injectable, NgZone } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { List } from 'immutable';
import { AuthService } from './auth.service';
declare var io: any;

@Injectable()
export class ProjectService extends BaseService {
	private _projects: BehaviorSubject<Array<Project>> = new BehaviorSubject([]);
	private zone: NgZone;
	private _currentProject: BehaviorSubject<Project> = new BehaviorSubject(null);

	get projects() {
		return this._projects.asObservable();
	}

	get currentProject() {
		return this._currentProject.asObservable().filter(project => {
			return project !== null;
		});
	}

	setCurrentProject(project: Project) {
		this._currentProject.next(project);
	}

	constructor(
		private http: Http,
		private authService: AuthService,
		private messageService: MessageService) {

		super(authService);

		this.zone = new NgZone({enableLongStackTrace: false});

		this.getProjects();

		io.socket.on('project', function(resp) {
			let verb = resp.verb;
			let id = resp.id;
			let projects;
			switch (verb) {
				case "created":
					projects = this._projects.getValue();
					projects.push(resp.data);
					this.publish(projects);
					break;
				case "updated":
					projects = this._projects.getValue();
					projects.forEach((prj: Project) => {
						if (prj.id === id) {
							prj.name = resp.data.name;
						}
					});
					this.publish(projects);
					break;
				case "destroyed":
					projects = this._projects.getValue().filter((prj: Project) => prj.id !== id);
					this.publish(projects);
					break;
				default:
					break;
			}
		}.bind(this));
	}

	private publish(data) {
		this.zone.run(() => {
			this._projects.next(data);
		})
	}

	updateProject(name: string, id: string): Observable<any> {
		return this.http.put('/api/projects/' + id, { name: name }, this.requestOptions)
			.map((response: Response) => response.json());
	}

	deleteProject(id: string): Observable<any> {
		return this.http.delete('/api/projects/' + id, this.requestOptions)
			.map((response: Response) => response.json());
	}

	newProject(name: string): Observable<any> {
		return this.http.post('/api/projects', { name: name }, this.requestOptions)
			.map((response: Response) => response.json());
	}

	private getProjects() {
		io.socket.request({ //subcribe to sails socket and get project list as well
			url: '/api/projects',
			method: 'GET',
			headers: {
				"Authentication": "Bearer " + this.authService.token
			}
		}, resp => {
			this.publish(resp as Project[]);
		});
	}
}
