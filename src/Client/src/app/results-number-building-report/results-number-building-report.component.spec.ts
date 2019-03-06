import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsNumberBuildingReportComponent } from './results-number-building-report.component';

describe('ResultsNumberBuildingReportComponent', () => {
  let component: ResultsNumberBuildingReportComponent;
  let fixture: ComponentFixture<ResultsNumberBuildingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsNumberBuildingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsNumberBuildingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
