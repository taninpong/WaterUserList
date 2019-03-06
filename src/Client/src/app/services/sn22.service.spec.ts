import { TestBed, inject } from '@angular/core/testing';

import { Sn22Service } from './sn22.service';

describe('Sn22Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Sn22Service]
    });
  });

  it('should be created', inject([Sn22Service], (service: Sn22Service) => {
    expect(service).toBeTruthy();
  }));
});
