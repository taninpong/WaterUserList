import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateJobComponent } from './validate-job.component';

describe('ValidateJobComponent', () => {
  let component: ValidateJobComponent;
  let fixture: ComponentFixture<ValidateJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
