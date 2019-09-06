export class Task {
  constructor(
    public taskId: number = 0,
    public parentId: number = 0,
    public projectId: number = 0,
    public taskName: string = '',
    public startDate: Date = new Date(),
    public endDate: Date = new Date(),
    public priority: number = 0,
    public status: string = '',
    public userId: number = 0
  ) {}
}
