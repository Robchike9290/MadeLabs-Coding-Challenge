import { Component, OnInit } from '@angular/core';
import { Aircraft, AIRCRAFT } from '../mock-aircraft-data';

@Component({
  selector: 'app-aircraft-selection',
  templateUrl: './aircraft-selection.component.html',
  styleUrls: ['./aircraft-selection.component.scss']
})
export class AircraftSelectionComponent implements OnInit {
  aircraft: Aircraft[] = AIRCRAFT;
  selectedAircraft?: number | null = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
