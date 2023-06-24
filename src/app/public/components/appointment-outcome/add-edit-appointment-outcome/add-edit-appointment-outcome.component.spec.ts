import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAppointmentOutcomeComponent } from './add-edit-appointment-outcome.component';

describe('AddEditAppointmentOutcomeComponent', () => {
  let component: AddEditAppointmentOutcomeComponent;
  let fixture: ComponentFixture<AddEditAppointmentOutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAppointmentOutcomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAppointmentOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
