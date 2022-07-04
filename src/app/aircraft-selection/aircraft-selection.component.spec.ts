import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftSelectionComponent } from './aircraft-selection.component';

describe('AircraftSelectionComponent', () => {
  let component: AircraftSelectionComponent;
  let fixture: ComponentFixture<AircraftSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AircraftSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AircraftSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
