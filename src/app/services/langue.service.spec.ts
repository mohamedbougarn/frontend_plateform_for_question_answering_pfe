import { TestBed } from '@angular/core/testing';

import { LangueService } from './langue.service';

describe('LangueService', () => {
  let service: LangueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LangueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
