import { TestBed } from '@angular/core/testing';

import { VisualService } from './visual.service';

describe('VisualService', () => {
  let service: VisualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
