import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Project } from '../domain/project';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Cache-Control': 'no-cache'
      })
  };

  allProjectsAPIEndpoint = environment.apiUrl + environment.apiProjectPrefix + '/allProjects';
  suspendProjectAPIEndpoint = environment.apiUrl + environment.apiProjectPrefix + '/suspend';
  addProjectAPIEndpoint = environment.apiUrl + environment.apiProjectPrefix + '/add';
  editProjectAPIEndpoint = environment.apiUrl + environment.apiProjectPrefix + '/edit';
  projectNamesAPIEndpoint = environment.apiUrl + environment.apiProjectPrefix + '/names';
  projectByIdAPIEndpoint = environment.apiUrl + environment.apiProjectPrefix;

  constructor(private http: HttpClient) { }

  getProjectDetails(): Observable<Project[]> {
    // console.log('ProjectService : get all projects');
    return this.http.get<Project[]>(this.allProjectsAPIEndpoint).pipe(
      tap(
        data => console.log(JSON.stringify(data)),
        catchError(this.handleError)
      )
    );
  }

  suspendProject(projectId: number) {
    // console.log('ProjectService : suspend project');
    return this.http.get<number>(this.suspendProjectAPIEndpoint + '/' + projectId).pipe(
      tap(
        data => console.log(JSON.stringify(data)),
        catchError(this.handleError)
      )
    );
  }

  addProject(project: Project) {
    // console.log('ProjectService : adding project.');
    return this.http.post<Project>(this.addProjectAPIEndpoint, project, this.httpOptions)
    .pipe(
      tap(
        result => // console.log(JSON.stringify(result)),
        catchError(this.handleError)
      )
    );
  }

  editProject(project: Project, projectId: number) {
    console.log('ProjectService : editing project.');
    return this.http.post<Project>(this.editProjectAPIEndpoint + '/' + projectId, project, this.httpOptions)
    .pipe(
      tap(
        result => // console.log(JSON.stringify(result)),
        catchError(this.handleError)
      )
    );
  }

  getProjectById(projectId: number): Observable<Project> {
    console.log('ProjectService : get project by id.');
    return this.http.get<Project>(this.projectByIdAPIEndpoint + '/' + projectId)
    .pipe(
      tap(
        result => // console.log(JSON.stringify(result)),
        catchError(this.handleError)
      )
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    // console.error(errorMessage);
    return throwError(errorMessage);
  }

}
