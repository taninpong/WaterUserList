import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarAllComponent } from './progress-bar-all.component';

describe('ProgressBarAllComponent', () => {
  let component: ProgressBarAllComponent;
  let fixture: ComponentFixture<ProgressBarAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressBarAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
