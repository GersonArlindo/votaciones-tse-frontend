import { TestBed } from '@angular/core/testing';

import { RolPermissionService } from './rol-permission.service';

describe('RolPermissionService', () => {
  let service: RolPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
