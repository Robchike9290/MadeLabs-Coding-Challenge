import { Component, OnInit } from '@angular/core';
import { observable, computed, action } from 'mobx-angular';
import { Aircraft } from './mock-aircraft-data';
import { AircraftService } from './aircraft.service';
import { Task } from './mock-aircraft-data';
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

  @computed getCurrentHours(): number {
    return this.aircraft[this.selectedAircraft - 1].currentHours;
  }

  @action setIntervalMonthsNextDueDate(taskNumber: number): Date | null {
    const logDate: Date | null = this.tasks[taskNumber - 1].logDate;
    const intervalMonths: number | null = this.tasks[taskNumber - 1].intervalMonths;
    let intervalMonthsNextDueDate: Date | null = null;
    if (intervalMonths) {
      intervalMonthsNextDueDate =  new Date(logDate.setMonth(logDate.getMonth() + intervalMonths));
    }
    return intervalMonthsNextDueDate;
  }

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
