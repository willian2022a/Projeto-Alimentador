import { TestBed } from '@angular/core/testing';

import { ServicosGeralService } from './servicos-geral.service';

describe('ServicosGeralService', () => {
  let service: ServicosGeralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicosGeralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
