import { Component, OnInit } from '@angular/core';
import { Task } from '../mock-aircraft-data';
import { TASKS } from '../mock-aircraft-data';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})

export class TaskListComponent implements OnInit {
  tasks: Task[] = TASKS;

  constructor() { }

  ngOnInit(): void {
  }

}
