export class Project {
  constructor(
    public projectId: number = 0,
    public projectName: string = '',
    public startDate: Date = new Date(),
    public endDate: Date = new Date(),
    public priority: number = 0,
    public projectStatus: string = '',
    public userId: number = 0,
    public noOfTasks: number = 0,
    public completed: number = 0
  ) { }
}
