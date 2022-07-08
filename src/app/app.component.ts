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

  @computed getCurrentHours(): number {
    return this.aircraft[this.selectedAircraft - 1].currentHours;
  }

  @action setIntervalMonthsNextDueDate(taskNumber: number): Date | null {
    const logDate: Date | null = this.tasks[taskNumber - 1].logDate;
    const intervalMonths: number | null = this.tasks[taskNumber - 1].intervalMonths;

    let intervalMonthsNextDueDate: Date | null = null;
    console.log('interval months:', intervalMonths);

    if (intervalMonths) {
      intervalMonthsNextDueDate = new Date(logDate.setMonth(logDate.getMonth() + intervalMonths));
      console.log('next due date, months:', intervalMonthsNextDueDate)
    }

    return intervalMonthsNextDueDate;
  }

  @action setIntervalHoursNextDueDate(taskNumber: number): Date | null {
    const logHours: number | null = this.tasks[taskNumber - 1].logHours;
    const intervalHours: number | null = this.tasks[taskNumber - 1].intervalHours;
    const currentHours: number = this.aircraft[this.selectedAircraft - 1].currentHours;
    const dailyHours: number = this.aircraft[this.selectedAircraft - 1].dailyHours;
    const today: Date = new Date(2018, 6, 19);

    let daysRemainingByHoursInterval: number | null = null;
    let intervalHoursNextDueDate: Date | null = null;

    function addDays(date: Date, days: number) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

    if (logHours && intervalHours && currentHours && dailyHours) {
      daysRemainingByHoursInterval = Math.round(((logHours + intervalHours) - currentHours) / dailyHours);
      // console.log("days remaining by hours interval:", daysRemainingByHoursInterval);
      intervalHoursNextDueDate = addDays(today, daysRemainingByHoursInterval);
    }

    return intervalHoursNextDueDate;
  }

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
    // set data functions
  }
}
