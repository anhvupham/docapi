import { Project } from './../models/project.model';
import { MessageService } from './message.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { List } from 'immutable';
import { AuthService } from './auth.service';
declare var io: any;

@Injectable()
export class ProjectService extends BaseService {
    private _projects: BehaviorSubject<List<Project>> = new BehaviorSubject(List([]))

    get projects() {
        return this._projects.asObservable();
    }

    constructor(
        private http: Http,
        private authService: AuthService,
        private messageService: MessageService) {

        super(authService);

        this.getProjects();

        io.socket.on('project', resp => { 
            let verb = resp.verb;
            let id = verb.id;
            let projects;
            switch (verb) {
                case "created":
                    this._projects.next(this._projects.getValue().push(new Project(resp.data)));
                    break;
                case "updated":
                    projects = List(this._projects.getValue());
                    projects.forEach((prj: Project) => {
                        if (prj.id === id) {
                            prj.name = name;
                        }
                    });
                    this._projects.next(List(this._projects.getValue()));
                    break;
                case "destroyed":
                    projects = this._projects.getValue().filter((prj: Project) => prj.id !== id).toList();
                    this._projects.next(projects);
                    break;
                default:
                    break;
            } 
        });
    }

    updateProject(name: string, id: string): Observable<any> {
        let obs = this.http.put('/api/projects/' + id, { name: name }, this.requestOptions)
            .map((response: Response) => response.json());

        // obs.subscribe(resp => {
        //     let projects = List(this._projects.getValue());
        //     projects.forEach((prj: Project) => {
        //         if (prj.id === id) {
        //             prj.name = name;
        //         }
        //     });
        //     this._projects.next(projects);
        // },
        //     resp => console.log(resp));

        return obs;
    }

    deleteProject(id: string): Observable<any> {
        let obs = this.http.delete('/api/projects/' + id, this.requestOptions)
            .map((response: Response) => response.json()).share();

        // obs.subscribe(resp => {
        //     let projects = this._projects.getValue().filter((prj: Project) => prj.id !== id).toList();
            
        //     this._projects.next(projects);
        // },
        //     resp => console.log(resp));

        return obs;
    }

    newProject(name: string): Observable<any> {
        let obs = this.http.post('/api/projects', { name: name }, this.requestOptions)
            .map((response: Response) => response.json()).share();

        // obs.subscribe({
        //     next: resp => {
        //         this._projects.next(this._projects.getValue().push(resp));
        //     },
        //     error: resp => console.log(resp)
        // })

        return obs;
    }

    getProjects() {
        // this.http.get('/api/projects', this.requestOptions)
        //     .map((response: Response) => response.json())
        //     .subscribe(resp => {
        //         let projects = resp.map(prj => new Project(prj)) as Project[];

        //         this._projects.next(List(projects));
        //     },
        //     this.messageService.error.bind(this.messageService));

        io.socket.request({ //subcribe to sails socket and get project list as well
            url: '/api/projects',
            method: 'GET',
            headers: {
                "Authentication": "Bearer " + this.authService.token
            }
        }, (resp, jwres) => { 
            let projects = resp.map(prj => new Project(prj)) as Project[];

            this._projects.next(List(projects));
        })
    }
}
