import { TestBed } from '@angular/core/testing';

import { JrvService } from './jrv.service';

describe('JrvService', () => {
  let service: JrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
