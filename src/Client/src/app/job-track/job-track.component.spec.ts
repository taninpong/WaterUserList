import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTrackComponent } from './job-track.component';

describe('JobTrackComponent', () => {
  let component: JobTrackComponent;
  let fixture: ComponentFixture<JobTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
