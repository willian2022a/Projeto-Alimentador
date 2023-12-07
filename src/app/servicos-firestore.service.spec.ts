import { TestBed } from '@angular/core/testing';

import { ServicosFirestoreService } from './servicos-firestore.service';

describe('ServicosFirestoreService', () => {
  let service: ServicosFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicosFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
