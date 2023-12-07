import { TestBed } from '@angular/core/testing';

import { ServicoModalService } from './servico-modal.service';

describe('ServicoModalService', () => {
  let service: ServicoModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicoModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
