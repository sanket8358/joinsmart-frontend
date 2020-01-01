import { TestBed } from '@angular/core/testing';

import { LinkedInService } from './linked-in.service';

describe('LinkedInService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinkedInService = TestBed.get(LinkedInService);
    expect(service).toBeTruthy();
  });
});
