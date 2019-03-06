import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsTimeReportComponent } from './results-time-report.component';

describe('ResultsTimeReportComponent', () => {
  let component: ResultsTimeReportComponent;
  let fixture: ComponentFixture<ResultsTimeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsTimeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsTimeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
