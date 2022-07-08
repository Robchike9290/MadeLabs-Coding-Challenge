import { Component, OnInit } from '@angular/core';

import { observable, computed, action } from 'mobx-angular';

import { Aircraft } from './mock-aircraft-data';
import { Task } from './mock-aircraft-data';

import { AircraftService } from './aircraft.service';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  aircraft: Aircraft[] = [];
  selectedAircraft: number = 1;
  tasks: Task[] = [];
  title = 'Aircraft Maintenance Schedule Tracker';

  // COMPLETE LATER (SET NEXT DUE DATE)
  // @action setNextDueDate(taskNumber: number): Date | null {
  //   const intervalMonthsNextDueDate = this.tasks[taskNumber - 1].intervalMonths
  //   return
  // }

  constructor(
    private aircraftService: AircraftService,
    private taskService: TaskService
  ) { }

  getAircraft(): void {
    this.aircraft = this.aircraftService.getAircraft();
  }

  getTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  ngOnInit(): void {
    this.getAircraft();
    this.getTasks();
  }
}
