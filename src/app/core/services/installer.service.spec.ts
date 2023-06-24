import { TestBed } from '@angular/core/testing';

import { InstallerService } from './installer.service';

describe('InstallerService', () => {
  let service: InstallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
