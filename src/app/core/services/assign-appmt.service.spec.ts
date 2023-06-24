import { TestBed } from '@angular/core/testing';

import { AssignAppmtService } from './assign-appmt.service';

describe('AssignAppmtService', () => {
  let service: AssignAppmtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignAppmtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
