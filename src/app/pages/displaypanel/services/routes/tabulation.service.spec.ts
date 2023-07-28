import { TestBed } from '@angular/core/testing';

import { TabulationService } from './tabulation.service';

describe('TabulationService', () => {
  let service: TabulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
