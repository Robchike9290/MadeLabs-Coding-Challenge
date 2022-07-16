import { Injectable } from '@angular/core';
import { Aircraft, AIRCRAFT } from './mock-aircraft-data';
import { Task, TASKS } from './mock-aircraft-data';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  aircraft: Aircraft[] = [];
  selectedAircraft = 1;
  sortedTasks: Task[] = [];
  unsortedTasks: Task[] = [];

  constructor() { }

  getAircraft(): Aircraft[] {

    return AIRCRAFT;
  }

  getTasks(): Task[] {
    return TASKS;
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
      let today: Date = new Date(2018, 5, 19);
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
}
