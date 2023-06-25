import { TestBed } from '@angular/core/testing';

import { PartidosPoliticosService } from './partidos-politicos.service';

describe('PartidosPoliticosService', () => {
  let service: PartidosPoliticosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartidosPoliticosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
