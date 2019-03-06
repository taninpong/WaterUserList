import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignReportComponent } from './assign-report.component';

describe('AssignReportComponent', () => {
  let component: AssignReportComponent;
  let fixture: ComponentFixture<AssignReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
