import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserTask } from '../models/user-task.interface';

@Injectable({
  providedIn: 'root',
})

export class StorageService {
  getTasksData(): Observable<UserTask[]> {
    const userTasks: UserTask[] = JSON.parse(localStorage.getItem('tasksData')!) || [];
    return of(userTasks);
  }

  addTask(task: UserTask): void {
    const tasksData: UserTask[] = this.getTasks() || [];
    tasksData.push(task);
    localStorage.setItem('tasksData', JSON.stringify(tasksData));
  }

  updateTask(selectedTask: UserTask): void {
    const tasksData: UserTask[] = this.getTasks();
    const updatedTaskId: number = tasksData.findIndex((task: UserTask) => task.task_id === selectedTask.task_id);
    const updatedTasksData: UserTask[] = [...tasksData.slice(0, updatedTaskId), selectedTask, ...tasksData.slice(updatedTaskId + 1, tasksData.length + 1)];
    localStorage.setItem('tasksData', JSON.stringify(updatedTasksData));
  }

  deleteTask(deletedTaskId: string): void {
    const tasksData: UserTask[] = this.getTasks();
    const updatedTasksData: UserTask[] = tasksData.filter((task: UserTask) => task.task_id !== deletedTaskId);
    localStorage.setItem('tasksData', JSON.stringify(updatedTasksData));
  }

  protected getTasks(): UserTask[] {
    return JSON.parse(localStorage.getItem('tasksData')!);
  }
}