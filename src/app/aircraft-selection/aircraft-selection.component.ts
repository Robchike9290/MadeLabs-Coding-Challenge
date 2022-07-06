import { Component, OnInit } from '@angular/core';
import { Aircraft } from '../mock-aircraft-data';
import { AircraftService } from '../aircraft.service';

@Component({
  selector: 'app-aircraft-selection',
  templateUrl: './aircraft-selection.component.html',
  styleUrls: ['./aircraft-selection.component.scss']
})
export class AircraftSelectionComponent implements OnInit {
  aircraft: Aircraft[] = [];
  selectedAircraft?: number | null = null;

  constructor(private aircraftService: AircraftService) { }

  getAircraft(): void {
    this.aircraft = this.aircraftService.getAircraft();
  }

  ngOnInit(): void {
    this.getAircraft();
  }

}
