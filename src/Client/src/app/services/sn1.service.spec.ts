import { TestBed, inject } from '@angular/core/testing';

import { Sn1Service } from './sn1.service';

describe('Sn1Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Sn1Service]
    });
  });

  it('should be created', inject([Sn1Service], (service: Sn1Service) => {
    expect(service).toBeTruthy();
  }));
});
