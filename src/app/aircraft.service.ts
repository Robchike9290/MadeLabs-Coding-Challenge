import { Injectable } from '@angular/core';
import { Aircraft, AIRCRAFT } from './mock-aircraft-data';

@Injectable({
  providedIn: 'root'
})

export class AircraftService {

  constructor() { }

  getAircraft(): Aircraft[] {
    return AIRCRAFT;
  }
}
