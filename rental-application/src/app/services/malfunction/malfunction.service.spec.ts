import { TestBed } from '@angular/core/testing';

import { MalfunctionService } from './malfunction.service';

describe('MalfunctionService', () => {
  let service: MalfunctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MalfunctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
