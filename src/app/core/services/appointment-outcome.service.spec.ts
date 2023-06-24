import { TestBed } from '@angular/core/testing';

import { AppointmentOutcomeService } from './appointment-outcome.service';

describe('AppointmentOutcomeService', () => {
  let service: AppointmentOutcomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentOutcomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
