import { Component, OnInit } from '@angular/core';

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
  aircraftMessage: string = '';
  title = 'Aircraft Maintenance Schedule Tracker';

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

  getSelectedAircraft(): void {
    if (this.selectedAircraft === 1) {
      this.aircraftMessage = 'first aircraft selected!';
    } else if (this.selectedAircraft === 2) {
      this.aircraftMessage = 'second aircraft selected!';
    }
  }

  ngOnInit(): void {
    this.getAircraft();
    this.getTasks();
    this.getSelectedAircraft();
  }
}
