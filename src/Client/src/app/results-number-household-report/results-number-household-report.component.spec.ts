import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsNumberHouseholdReportComponent } from './results-number-household-report.component';

describe('ResultsNumberHouseholdReportComponent', () => {
  let component: ResultsNumberHouseholdReportComponent;
  let fixture: ComponentFixture<ResultsNumberHouseholdReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsNumberHouseholdReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsNumberHouseholdReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
