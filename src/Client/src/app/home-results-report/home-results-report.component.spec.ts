import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeResultsReportComponent } from './home-results-report.component';

describe('HomeResultsReportComponent', () => {
  let component: HomeResultsReportComponent;
  let fixture: ComponentFixture<HomeResultsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeResultsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeResultsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
