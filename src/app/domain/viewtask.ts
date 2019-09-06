import { Task } from './task';
import { Parenttask } from './parenttask';

export class Viewtask {
  constructor(
    public task: Task,
    public parentTask: Parenttask
  ) { }
}
