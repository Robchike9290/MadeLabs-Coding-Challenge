import { Injectable } from '@angular/core';
import { Task, TASKS } from './mock-aircraft-data';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor() { }

  getTasks(): Task[] {
    return TASKS;
  }
}
