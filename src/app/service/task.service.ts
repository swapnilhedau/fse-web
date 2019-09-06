import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Parenttask } from '../domain/parenttask';
import { tap, catchError } from 'rxjs/operators';
import { Task } from '../domain/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Cache-Control': 'no-cache'
      })
  };

  allParentTasksAPIEndpoint = environment.apiUrl + environment.apiTaskPrefix + '/allParentTasks';
  addParentTaskAPIEndpoint = environment.apiUrl + environment.apiTaskPrefix + '/addParentTask';
  addTaskAPIEndpoint = environment.apiUrl + environment.apiTaskPrefix + '/addTask';
  taskByIdAPIEndpoint = environment.apiUrl + environment.apiTaskPrefix;

  constructor(private http: HttpClient) { }

  getParentTasks(): Observable<Parenttask[]> {
    console.log('TaskService : get all Parent Tasks' + this.allParentTasksAPIEndpoint);
    return this.http.get<Parenttask[]>(this.allParentTasksAPIEndpoint).pipe(
      tap(
        data => console.log(JSON.stringify(data)),
        catchError(this.handleError)
      )
    );

  }

  addParentTask(parenttask: Parenttask) {
    console.log('TaskService : adding parent task.');
    return this.http.post<Parenttask>(this.addParentTaskAPIEndpoint, parenttask, this.httpOptions)
    .pipe(
      tap(
        result => console.log(JSON.stringify(result)),
        catchError(this.handleError)
      )
    );
  }

  addTask(task: Task) {
    console.log('TaskService : adding task.');
    return this.http.post<Task>(this.addTaskAPIEndpoint, task, this.httpOptions)
    .pipe(
      tap(
        result => console.log(JSON.stringify(result)),
        catchError(this.handleError)
      )
    );
  }

  getTaskById(taskId: number) {
    console.log('TaskService : get task by id.');
    return this.http.get<Task>(this.taskByIdAPIEndpoint + '/' + taskId)
    .pipe(
      tap(
        result => console.log(JSON.stringify(result)),
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
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
