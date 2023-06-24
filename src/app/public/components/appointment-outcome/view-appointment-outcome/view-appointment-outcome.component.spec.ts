import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppointmentOutcomeComponent } from './view-appointment-outcome.component';

describe('ViewAppointmentOutcomeComponent', () => {
  let component: ViewAppointmentOutcomeComponent;
  let fixture: ComponentFixture<ViewAppointmentOutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAppointmentOutcomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAppointmentOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
