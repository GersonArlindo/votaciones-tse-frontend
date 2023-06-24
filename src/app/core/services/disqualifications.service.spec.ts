import { TestBed } from '@angular/core/testing';

import { DisqualificationsService } from './disqualifications.service';

describe('DisqualificationsService', () => {
  let service: DisqualificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisqualificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
