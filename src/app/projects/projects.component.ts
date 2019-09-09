import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../domain/project';
import { ProjectService } from '../service/project.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { User } from '../domain/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[];
  users: User[];

  minStartDate = new Date();
  minEndDate = new Date().getDate() + 1;

  @ViewChild('projectForm') formValue;
  projectForm: FormGroup;

  project: Project = {
    projectId: null,
    projectName: '',
    startDate: null,
    endDate: null,
    priority: null,
    projectStatus: 'ACTIVE',
    userId: null,
    noOfTasks: 0,
    completed: 0
  };

  edit: boolean;

  projectSearchText: '';
  isAsc = true;

  constructor(private projectService: ProjectService,
              private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getProjectDetails();
    this.getUserDetails();
  }

  getProjectDetails() {
    this.projectService.getProjectDetails()
    .subscribe(
      result => this.projects = result
      // , error => console.error(error)
    );
  }

  getUserDetails() {
    this.userService.getUserDetails().subscribe(
      response => this.users = response
      // ,error => console.error(error)
      );
  }

  submitProjectForm(projectForm: NgForm) {
    if (projectForm.valid) {
      if (this.edit) {
        this.projectService.editProject(projectForm.value, projectForm.value.projectId)
          .subscribe(
            response => {
                      this.edit = false;
                      this.getProjectDetails();
                      this.formValue.resetForm();
                      this.openSnackBar('Project edited.', 'Success', 'green-snackbar');
                  }
            , error => {
              // console.error(error);
              this.openSnackBar('Error editing Project. Try again.', 'Error', 'red-snackbar');
            }
          );
      } else {
        this.projectService.addProject(projectForm.value)
        .subscribe(
          response => {
                    this.getProjectDetails();
                    this.formValue.resetForm();
                    this.openSnackBar('Project updated.', 'Success', 'green-snackbar');
                }
          , error => {
            // console.error(error);
            this.openSnackBar('Error updating Project. Try again.', 'Error', 'red-snackbar');
          }
        );
      }

    }
  }

  suspendProject(projectId: number) {
    this.projectService.suspendProject(projectId).subscribe(
      response => {
        this.getProjectDetails();
        this.openSnackBar('Project suspended.', 'Success', 'green-snackbar');
      },
      error => {
        // console.error(error);
        this.openSnackBar('Error suspending Project. Try again.', 'Error', 'red-snackbar');
      }
    );
  }

  updateProject(projectId: number) {
    this.edit = true;
    this.projectService.getProjectById(projectId)
    .subscribe(
      response => {
          this.project = response;
          // console.log('get user to edit.');
        }
      // , error => console.error()
    );
  }

  cancelEdit(projectForm: NgForm) {
    this.edit = false;
    this.formValue.resetForm();
  }

  sortProjectBy(sortby: string) {
    this.isAsc = !this.isAsc;
    switch (sortby) {
      case 'SD' : {
        // console.log('sorting by start date');
        this.projects.sort((a, b) => this.compare(a.startDate, b.startDate, this.isAsc));
        break;
      }
      case 'ED': {
        // console.log('sorting by end date');
        this.projects.sort((a, b) => this.compare(a.endDate, b.endDate, this.isAsc));
        break;
      }
      case 'PR': {
        // console.log('sorting by project priority');
        this.projects.sort((a, b) => this.compare(a.priority, b.priority, this.isAsc));
        break;
      }
      default: {
        // console.log('sorting by task completed');
        break;
      }
    }
  }

  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: [className]
    });
  }

}
