import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../domain/user';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Cache-Control': 'no-cache'
      })
  };

  allUsersAPIEndpoint = environment.apiUrl + environment.apiUserPrefix + '/allUsers';
  addUserAPIEndpoint = environment.apiUrl + environment.apiUserPrefix + '/add';
  deleteUserAPIEndpoint = environment.apiUrl + environment.apiUserPrefix;
  userByIdAPIEndpoint = environment.apiUrl + environment.apiUserPrefix;
  editUserAPIEndpoint = environment.apiUrl + environment.apiUserPrefix + '/edit';
  userNamesAPIEndpoint = environment.apiUrl + environment.apiUserPrefix + '/names';


  constructor(private http: HttpClient) { }

  getUserDetails(): Observable<User[]> {
    // console.log('UserService : get all users - ' + this.allUsersAPIEndpoint);
    return this.http.get<User[]>(this.allUsersAPIEndpoint).pipe(
      tap(
        data => // console.log(JSON.stringify(data)),
        catchError(this.handleError)
      )
    );
  }

  addUser(user: User) {
    // console.log('UserService : adding user.' + user);
    return this.http.post<User>(this.addUserAPIEndpoint, user, this.httpOptions)
    .pipe(
      tap(
        result => // console.log(JSON.stringify(result)),
        catchError(this.handleError)
      )
    );
  }

  editUser(user: User, userId: number) {
    // console.log('UserService : editing user.');
    return this.http.post<User>(this.editUserAPIEndpoint + '/' + userId, user, this.httpOptions)
    .pipe(
      tap(
        result => // console.log(JSON.stringify(result)),
        catchError(this.handleError)
      )
    );
  }

  getUserById(userId: number): Observable<User> {
    // console.log('UserService : get user by id.');
    return this.http.get<User>(this.userByIdAPIEndpoint + '/' + userId)
    .pipe(
      tap(
        result => // console.log(JSON.stringify(result)),
        catchError(this.handleError)
      )
    );
  }

  deleteUser(userId: number): Observable<string> {
    // console.log('UserService : deleting user.');
    return this.http.delete<string>(this.deleteUserAPIEndpoint + '/' + userId)
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
