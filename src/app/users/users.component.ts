import { Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { User } from '../domain/user';
import { NgForm, FormGroup } from '@angular/forms';

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

  constructor(private userService: UserService, private router: Router) {
    console.log('app-users constructor');
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getUserDetails().subscribe(
      response => this.users = response,
      error => console.error(error));
  }

  ngOnInit() {
    console.log('app-users ngOnInit');
    this.getUserDetails();
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
                      this.router.navigateByUrl('user');
                  }
            , error => console.error(error)
          );
      } else {
        this.userService.addUser(userForm.value)
        .subscribe(
          response => {
                    this.getUserDetails();
                    this.formValue.resetForm();
                    this.router.navigateByUrl('user');
                }
          , error => console.error(error)
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
                  this.router.navigateByUrl('user');
                }
        , error => console.error(error)
      );
  }

}
