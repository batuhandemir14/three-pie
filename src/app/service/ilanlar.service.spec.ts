import { TestBed } from '@angular/core/testing';

import { IlanlarService } from './ilanlar.service';

describe('IlanlarService', () => {
  let service: IlanlarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IlanlarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
