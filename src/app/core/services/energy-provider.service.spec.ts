import { TestBed } from '@angular/core/testing';

import { EnergyProviderService } from './energy-provider.service';

describe('EnergyProviderService', () => {
  let service: EnergyProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnergyProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
