import { Viewtask } from './viewtask';
import { Task } from './task';
import { Parenttask } from './parenttask';

describe('Viewtask', () => {
  it('should create an instance', () => {
    expect(new Viewtask(new Task(), new Parenttask())).toBeTruthy();
  });
});
