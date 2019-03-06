import { TestBed, inject } from '@angular/core/testing';

import { TabletService } from './tablet.service';

describe('TabletService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TabletService]
    });
  });

  it('should be created', inject([TabletService], (service: TabletService) => {
    expect(service).toBeTruthy();
  }));
});
