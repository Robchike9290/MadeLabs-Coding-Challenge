import { Component, OnInit, AfterContentChecked } from '@angular/core';

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
  aircraftMessage: string = '';
  selectedAircraft: number = 1;
  sortedTasks: Task[] = [];
  unsortedTasks: Task[] = [];
  title = 'Aircraft Maintenance Schedule Tracker';

  constructor(
    private aircraftService: AircraftService,
    private taskService: TaskService
  ) { }

  getAircraft(): void {
    this.aircraft = this.aircraftService.getAircraft();
  }

  getTasks(): void {
    this.unsortedTasks = this.taskService.getTasks();
  }

  calculateSelectedAircraftDueDates(): void {
    this.sortedTasks = JSON.parse(JSON.stringify(this.unsortedTasks));

    function addDays(date: Date, days: number) {
      var result: Date = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

    for (let i: number = 0; i < this.sortedTasks.length; i++) {
      let task = this.sortedTasks[i];
      let today: Date = new Date(2018, 6, 19);
      let logDate: Date | string = new Date(task.logDate);
      let calculationAircraft: Aircraft = this.aircraft[this.selectedAircraft - 1];
      let currentHours: number = calculationAircraft.currentHours;
      let dailyHours: number = calculationAircraft.dailyHours;
      let daysRemainingByHoursInterval: number | null = null;
      let intervalHoursNextDueDate: Date | null = null;
      let intervalMonthsNextDueDate: Date | null = null;
      let nextDue: Date | string | null = null;

      if (task.intervalMonths) {
        intervalMonthsNextDueDate = new Date(logDate.setMonth(logDate.getMonth() + task.intervalMonths));
      }

      if (task.logHours && task.intervalHours && currentHours && dailyHours) {
        daysRemainingByHoursInterval = Math.round(((task.logHours + task.intervalHours) - currentHours) / dailyHours);
        intervalHoursNextDueDate = addDays(today, daysRemainingByHoursInterval);
      }

      this.sortedTasks[i].intervalMonthsNextDueDate = intervalMonthsNextDueDate;
      this.sortedTasks[i].intervalHoursNextDueDate = intervalHoursNextDueDate;

      if (intervalHoursNextDueDate && intervalMonthsNextDueDate) {
        let intervalHoursNumber: number = intervalHoursNextDueDate.getTime();
        let intervalMonthsNumber: number = intervalMonthsNextDueDate.getTime();

        nextDue = intervalMonthsNumber < intervalHoursNumber
        ?
        intervalMonthsNextDueDate
        :
        intervalHoursNextDueDate;

      } else if (intervalHoursNextDueDate) {
        nextDue = intervalHoursNextDueDate;
      } else if (intervalMonthsNextDueDate) {
        nextDue = intervalMonthsNextDueDate;
      }

      this.sortedTasks[i].nextDue = nextDue;
      this.sortedTasks[i].logDate = JSON.stringify(this.sortedTasks[i].logDate).slice(1, -6);
    }
  }

  sortTasksByDueDate(): void {
    let tasksWithDueDates: Task[] = this.sortedTasks.filter((task) => {return task.nextDue !== null});
    let tasksWithoutDueDates: Task[] = this.sortedTasks.filter((task) => {return task.nextDue === null});

    if (tasksWithDueDates.length > 1) {
      tasksWithDueDates.sort((currentTask, nextTask) => {
        let currentTaskNumericDate: number = 0;
        let nextTaskNumericDate: number = 0;

        if (currentTask.nextDue instanceof Date) {
          currentTaskNumericDate = currentTask.nextDue?.getTime();
        }

        if (nextTask.nextDue instanceof Date) {
          nextTaskNumericDate = nextTask.nextDue?.getTime();
        }

        return currentTaskNumericDate - nextTaskNumericDate;
      })
    }

    if (tasksWithoutDueDates.length > 1) {
      tasksWithoutDueDates.sort();
    }

    this.sortedTasks = [...tasksWithDueDates, ...tasksWithoutDueDates];
  }

  stringifyDueDates(): void {
    this.sortedTasks.forEach((task) => {
      if (task.nextDue instanceof Date) {
        task.nextDue = task.nextDue?.toISOString().slice(0, -5);
      }
    })
  }

  updateAircraftCurrentHours(input: string): void {
    if (typeof Number(input) === 'number') {
      this.aircraft[this.selectedAircraft - 1].currentHours = Number(input);
    } else {
      throw "Please input a number.";
    }
  }

  updateAircraftDailyHours(input: string): void {
    if (typeof Number(input) === 'number') {
      this.aircraft[this.selectedAircraft - 1].dailyHours = Number(input);
    } else {
      throw "Please input a number.";
    }
  }

  ngOnInit(): void {
    this.getAircraft();
    this.getTasks();
  }

  ngAfterContentChecked(): void {
    this.calculateSelectedAircraftDueDates();
    this.sortTasksByDueDate();
    this.stringifyDueDates();
  }
}
