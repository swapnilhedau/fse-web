import { Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { User } from '../domain/user';
import { NgForm, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  displayedColumns: string[] = ['userId', 'firstName', 'lastName', 'employeeId', 'actions'];

  @ViewChild('userForm') formValue;
  userForm: FormGroup;
  user: User = {
    userId: null,
    firstName: null,
    lastName: null,
    employeeId: null,
    projectId: null,
    taskId: null
  };

  edit: boolean;

  constructor(private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getUserDetails().subscribe(
      response => this.users = response,
      error => console.error(error));
  }

  submitUserForm(userForm: NgForm) {
    if (userForm.valid) {
      if (this.edit) {
        this.userService.editUser(userForm.value, userForm.value.userId)
          .subscribe(
            response => {
                      this.edit = false;
                      this.getUserDetails();
                      this.formValue.resetForm();
                      this.openSnackBar('User edited.', 'Success', 'green-snackbar');
                  }
            , error => {
              console.error(error);
              this.openSnackBar('Error editing User. Try again', 'Error', 'red-snackbar');
            }
          );
      } else {
        this.userService.addUser(userForm.value)
        .subscribe(
          response => {
                    this.getUserDetails();
                    this.formValue.resetForm();
                    this.openSnackBar('User added.', 'Success', 'green-snackbar');
                }
          , error => {
            console.error(error);
            this.openSnackBar('Error adding User. Try again', 'Error', 'red-snackbar');
          }
        );
      }

    }
  }

  updateUser(userId: number) {
    this.edit = true;
    this.userService.getUserById(userId)
    .subscribe(
      response => {
          this.user = response;
          console.log('get user to edit.');
        }
      , error => console.error()
    );
  }

  cancelEdit(userForm: NgForm) {
    this.edit = false;
    this.formValue.resetForm();
  }

  delete(userId: number) {
    this.userService.deleteUser(userId)
      .subscribe(
        response => {
                  this.getUserDetails();
                  this.formValue.resetForm();
                  this.openSnackBar('User deleted.', 'Success', 'green-snackbar');
                }
        , error => {
          console.error(error);
          this.openSnackBar('Error deleting User. Try again.', 'Error', 'red-snackbar');
        }
      );
  }

  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: [className]
    });
  }

}
