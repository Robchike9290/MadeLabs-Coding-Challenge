import { Injectable } from '@angular/core';
import { Aircraft, AIRCRAFT } from './mock-aircraft-data';
import { Task, TASKS } from './mock-aircraft-data';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor() { }

  getAircraft(): Aircraft[] {
    return AIRCRAFT;
  }

  getTasks(): Task[] {
    return TASKS;
  }
}
