import { TestBed } from '@angular/core/testing';

import { DestinoSufragioService } from './destino-sufragio.service';

describe('DestinoSufragioService', () => {
  let service: DestinoSufragioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinoSufragioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
