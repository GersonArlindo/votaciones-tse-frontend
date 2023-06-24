import { TestBed } from '@angular/core/testing';

import { LenguageService } from './lenguage.service';

describe('LenguageService', () => {
  let service: LenguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LenguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
