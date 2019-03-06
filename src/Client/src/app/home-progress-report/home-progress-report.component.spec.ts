import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProgressReportComponent } from './home-progress-report.component';

describe('HomeProgressReportComponent', () => {
  let component: HomeProgressReportComponent;
  let fixture: ComponentFixture<HomeProgressReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProgressReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProgressReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
