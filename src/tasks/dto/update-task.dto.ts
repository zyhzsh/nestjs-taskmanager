import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks-status.emum';

export class UpdateTask {
  title: string;
  description: string;
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
