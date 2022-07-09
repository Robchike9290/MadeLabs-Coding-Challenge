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

  getSelectedAircraftDueDates(): void {
    this.sortedTasks = JSON.parse(JSON.stringify(this.unsortedTasks));
    console.log(this.sortedTasks);

    function addDays(date: Date, days: number) {
      var result: Date = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

    if (this.selectedAircraft === 1) {
      this.aircraftMessage = 'first aircraft selected!';
    } else if (this.selectedAircraft === 2) {
      this.aircraftMessage = 'second aircraft selected!';
    }

    for (let i: number = 0; i < this.sortedTasks.length; i++) {
      let task = this.sortedTasks[i];
      let today: Date = new Date(2018, 6, 19);
      let logDate = new Date(task.logDate);
      let calculationAircraft: Aircraft = this.aircraft[this.selectedAircraft - 1];
      let currentHours: number = calculationAircraft.currentHours;
      let dailyHours: number = calculationAircraft.dailyHours;
      let daysRemainingByHoursInterval: number | null = null;
      let intervalHoursNextDueDate: Date | null = null;
      let intervalMonthsNextDueDate: Date | null = null;
      let nextDue: Date | null = null;

      if (task.intervalMonths) {
        console.log(i, task.logDate);
        intervalMonthsNextDueDate = new Date(logDate.setMonth(logDate.getMonth() + task.intervalMonths));
        console.log(i, task.logDate);
      }

      if (task.logHours && task.intervalHours && currentHours && dailyHours) {
        daysRemainingByHoursInterval = Math.round(((task.logHours + task.intervalHours) - currentHours) / dailyHours);
        intervalHoursNextDueDate = addDays(today, daysRemainingByHoursInterval);
      }

      this.sortedTasks[i].intervalMonthsNextDueDate = intervalMonthsNextDueDate;
      this.sortedTasks[i].intervalHoursNextDueDate = intervalHoursNextDueDate;

      if (intervalHoursNextDueDate && intervalMonthsNextDueDate) {
        let intervalHoursNumber: number | null = intervalHoursNextDueDate.getTime();
        let intervalMonthsNumber: number | null = intervalMonthsNextDueDate.getTime();
        nextDue = intervalMonthsNumber < intervalHoursNumber ? intervalMonthsNextDueDate : intervalHoursNextDueDate;
      } else if (intervalHoursNextDueDate) {
        nextDue = intervalHoursNextDueDate;
      } else if (intervalMonthsNextDueDate) {
        nextDue = intervalMonthsNextDueDate;
      }

      this.sortedTasks[i].nextDue = nextDue;
    }
  }

  ngOnInit(): void {
    this.getAircraft();
    this.getTasks();
  }

  ngAfterContentChecked(): void {
    this.getSelectedAircraftDueDates();
  }
}
