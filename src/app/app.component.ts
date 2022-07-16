import { Component, OnInit, AfterContentChecked } from '@angular/core';

import { Aircraft } from './mock-aircraft-data';
import { Task } from './mock-aircraft-data';

import { DataService } from './data.service';

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

  constructor(
    private dataService: DataService
  ) { }

  getAircraft(): void {
    this.aircraft = this.dataService.getAircraft();
  }

  getTasks(): void {
    this.tasks = this.dataService.getTasks();
  }

  updateAircraftCurrentHours(input: string): void {
    if (typeof Number(input) === 'number' && Number(input) >= 0 && input !== 'e') {
      this.aircraft[this.selectedAircraft - 1].currentHours = Number(input);
    } else {
      alert("Please input a number greater than or equal to zero.");
    }
  }

  updateAircraftDailyHours(input: string): void {
    if (typeof Number(input) === 'number' && Number(input) >= 0 && Number(input) <= 24 && input !== 'e') {
      this.aircraft[this.selectedAircraft - 1].dailyHours = Number(input);
    } else {
      alert("Please input a number between 0 and 24.");
    }
  }

  ngOnInit(): void {
    this.getAircraft();
    this.getTasks();
  }

  ngAfterContentChecked(): void {
    // this.calculateSelectedAircraftDueDates();
    // this.sortTasksByDueDate();
    // this.stringifyDueDates();
  }
}
