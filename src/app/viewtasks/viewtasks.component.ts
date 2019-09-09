import { Component, OnInit } from '@angular/core';
import { Viewtask } from '../domain/viewtask';
import { ViewtaskService } from '../service/viewtask.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-viewtasks',
  templateUrl: './viewtasks.component.html',
  styleUrls: ['./viewtasks.component.css']
})
export class ViewtasksComponent implements OnInit {

  viewTasks: Viewtask[];
  displayedColumns: string[] = ['task', 'parent', 'priority', 'start', 'end', 'actions'];

  projectSearchText: '';

  isAsc = true;

  constructor(private viewTaskService: ViewtaskService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getViewTasks();
  }

  getViewTasks() {
    this.viewTaskService.getViewTasks().subscribe(
      response => this.viewTasks = response,
      // error => console.error(error)
      );
  }

  endTask(taskId: number) {
    this.viewTaskService.endTask(taskId).subscribe(
      response => {
        this.getViewTasks();
        this.openSnackBar('Task ended.', 'Success', 'green-snackbar');
      },
      error => {
        // console.error(error);
        this.openSnackBar('Error ending Task.', 'Error', 'red-snackbar');
      }
    );
  }

  editTask(taskId: number) {
    // console.log(taskId);
    this.router.navigateByUrl('task/' + taskId);
  }

  sortViewTaskBy(sortby: string) {
    this.isAsc = !this.isAsc;
    switch (sortby) {
      case 'SD' : {
        // console.log('sorting by start date');
        this.viewTasks.sort((a, b) => this.compare(a.task.startDate, b.task.startDate, this.isAsc));
        break;
      }
      case 'ED': {
        // console.log('sorting by end date');
        this.viewTasks.sort((a, b) => this.compare(a.task.endDate, b.task.endDate, this.isAsc));
        break;
      }
      case 'PR': {
        // console.log('sorting by project priority');
        this.viewTasks.sort((a, b) => this.compare(a.task.priority, b.task.priority, this.isAsc));
        break;
      }
      default: {
        // console.log('sorting by task completed');
        this.viewTasks.sort((a, b) => this.compare(a.task.status, b.task.status, this.isAsc));
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
