import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.emum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTask } from './dto/update-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async getTasks(filtedDto: GetTasksFilterDTO): Promise<Task[]> {
    return this.tasksRepository.getTasks(filtedDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) throw new NotFoundException(`Task with ID: ${id} not found`);
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Task with ID: ${id} not found`);
  }
  async updateTask(id: string, updateTask: UpdateTask): Promise<Task> {
    let task = await this.getTaskById(id);
    task = { id: id, ...updateTask };
    await this.tasksRepository.save(task);
    return task;
  }
  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
