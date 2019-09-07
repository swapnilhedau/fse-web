import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../domain/project';
import { User } from '../domain/user';
import { UserService } from '../service/user.service';
import { ProjectService } from '../service/project.service';
import { FormGroup, NgForm } from '@angular/forms';
import { Task } from '../domain/task';
import { Parenttask } from '../domain/parenttask';
import { TaskService } from '../service/task.service';
import { Ptor } from 'protractor';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  minStartDate = new Date();
  minEndDate = new Date().getDate() + 1;

  projects: Project[];
  users: User[];
  parentTasks: Parenttask[];

  isParentTask: boolean;

  @ViewChild('taskForm') formValue;
  taskForm: FormGroup;

  task: Task = {
    taskId: 0,
    parentId: 0,
    projectId: 0,
    taskName: '',
    startDate: null,
    endDate: null,
    priority: 0,
    status: 'OPEN',
    userId: 0
  };

  edit: boolean;

  constructor(private projectService: ProjectService,
              private userService: UserService,
              private taskService: TaskService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
                console.log('taskId - ' + this.route.snapshot.paramMap.get('taskId'));
                if (null != this.route.snapshot.paramMap.get('taskId')) {
                  this.updateTask(Number(this.route.snapshot.paramMap.get('taskId')));
                }
  }

  ngOnInit() {
    this.getProjectDetails();
    this.getUserDetails();
    this.getParentTasks();
  }

  getProjectDetails() {
    this.projectService.getProjectDetails()
    .subscribe(
      result => this.projects = result,
      error => console.error(error)
    );
  }

  getUserDetails() {
    this.userService.getUserDetails().subscribe(
      response => this.users = response,
      error => console.error(error));
  }

  getParentTasks() {
    this.taskService.getParentTasks()
    .subscribe(
      result => this.parentTasks = result,
      error => console.error(error)
    );
  }

  submitTaskForm(taskForm: NgForm) {
    if (taskForm.valid) {
      if (this.isParentTask) {
        console.log('## submitting TaskForm for parent task ##' + this.isParentTask);
        this.taskService.addParentTask(new Parenttask(null, taskForm.value.taskName))
        .subscribe(
          response => {
                    this.getParentTasks();
                    this.formValue.resetForm();
                    this.openSnackBar('Parent Task added.', 'Success', 'green-snackbar');
          }
          , error => {
            console.error(error);
            this.openSnackBar('Error adding Parent Task. Try again', 'Error', 'red-snackbar');
          }
        );
      } else {
        console.log('## submitting TaskForm for task ##' + this.isParentTask);
        this.taskService.addTask(taskForm.value)
        .subscribe(
          response => {
                    this.getParentTasks();
                    this.formValue.resetForm();
                    this.openSnackBar('Task added.', 'Success', 'green-snackbar');
          }
          , error => {
            console.error(error);
            this.openSnackBar('Error adding Task. Try again', 'Error', 'red-snackbar');
          }
        );
      }
    }
  }

  updateTask(taskId: number) {
    this.edit = true;
    this.taskService.getTaskById(taskId)
    .subscribe(
      response => {
          this.task = response;
          if (this.task.parentId === 0) {
            this.isParentTask = true;
          } else {
            this.isParentTask = false;
          }
          console.log('get task to edit.' + this.task.parentId);
        }
      , error => console.error()
    );
  }

  cancelEdit() {
    this.edit = false;
    this.router.navigateByUrl('task');
  }

  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: [className]
    });
  }

}
