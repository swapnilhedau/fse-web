import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { ViewtasksComponent } from './viewtasks/viewtasks.component';

const routes: Routes = [
  { path: 'user', component: UsersComponent },
  { path: 'project', component: ProjectsComponent },
  { path: 'task', component: TasksComponent },
  { path: 'viewtask', component: ViewtasksComponent },

  { path: 'task/:taskId', component: TasksComponent },

  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '**', redirectTo: 'user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
