import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AircraftSelectionComponent } from './aircraft-selection/aircraft-selection.component';
import { UpdateHoursComponent } from './update-hours/update-hours.component';
import { TaskListComponent } from './task-list/task-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AircraftSelectionComponent,
    UpdateHoursComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
