import { Component, OnInit } from '@angular/core';
import { Viewtask } from '../domain/viewtask';
import { ViewtaskService } from '../service/viewtask.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewtasks',
  templateUrl: './viewtasks.component.html',
  styleUrls: ['./viewtasks.component.css']
})
export class ViewtasksComponent implements OnInit {

  viewTasks: Viewtask[];
  displayedColumns: string[] = ['task', 'parent', 'priority', 'start', 'end', 'actions'];

  isAsc = true;

  constructor(private viewTaskService: ViewtaskService, private router: Router) { }

  ngOnInit() {
    this.getViewTasks();
  }

  getViewTasks() {
    this.viewTaskService.getViewTasks().subscribe(
      response => this.viewTasks = response,
      error => console.error(error));
  }

  endTask(taskId: number) {
    this.viewTaskService.endTask(taskId).subscribe(
      response => this.getViewTasks(),
      error => console.error(error)
    );
  }

  editTask(taskId: number) {
    console.log(taskId);
    this.router.navigateByUrl('task/' + taskId);
  }

  sortViewTaskBy(sortby: string) {
    this.isAsc = !this.isAsc;
    switch (sortby) {
      case 'SD' : {
        console.log('sorting by start date');
        this.viewTasks.sort((a, b) => this.compare(a.task.startDate, b.task.startDate, this.isAsc));
        break;
      }
      case 'ED': {
        console.log('sorting by end date');
        this.viewTasks.sort((a, b) => this.compare(a.task.endDate, b.task.endDate, this.isAsc));
        break;
      }
      case 'PR': {
        console.log('sorting by project priority');
        this.viewTasks.sort((a, b) => this.compare(a.task.priority, b.task.priority, this.isAsc));
        break;
      }
      default: {
        console.log('sorting by task completed');
        this.viewTasks.sort((a, b) => this.compare(a.task.status, b.task.status, this.isAsc));
        break;
      }
    }
  }

  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
