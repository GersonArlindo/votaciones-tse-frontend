import { TestBed } from '@angular/core/testing';

import { CentroVotacionService } from './centro-votacion.service';

describe('CentroVotacionService', () => {
  let service: CentroVotacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentroVotacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
