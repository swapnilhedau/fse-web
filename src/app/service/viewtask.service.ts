import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Viewtask } from '../domain/viewtask';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewtaskService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Cache-Control': 'no-cache'
      })
  };

  allViewTasksAPIEndpoint = environment.apiUrl + environment.apiViewTaskPrefix + '/allViewTasks';
  endTaskAPIEndpoint = environment.apiUrl + environment.apiViewTaskPrefix + '/endtask';


  constructor(private http: HttpClient) { }

  getViewTasks(): Observable<Viewtask[]> {
    // console.log('ViewtaskService : get all viewtask - ' + this.allViewTasksAPIEndpoint);
    return this.http.get<Viewtask[]>(this.allViewTasksAPIEndpoint).pipe(
      tap(
        data => // console.log(JSON.stringify(data)),
        catchError(this.handleError)
      )
    );
  }



  endTask(taskId: number) {
    // console.log('ViewServiceService : end task');
    return this.http.get<number>(this.endTaskAPIEndpoint + '/' + taskId).pipe(
      tap(
        data => // console.log(JSON.stringify(data)),
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
