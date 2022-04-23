import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks-status.emum';

export class UpdataTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
