import { Component, OnInit } from '@angular/core';
import { Task } from '../mock-aircraft-data';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})

export class TaskListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  getTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  ngOnInit(): void {
    this.getTasks();
  }

}
