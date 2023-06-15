import { TestBed } from '@angular/core/testing';

import { AdditionalInfoService } from './additional-info.service';

describe('AdditionalInfoService', () => {
  let service: AdditionalInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
