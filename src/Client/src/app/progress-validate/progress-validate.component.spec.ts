import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressValidateComponent } from './progress-validate.component';

describe('ProgressValidateComponent', () => {
  let component: ProgressValidateComponent;
  let fixture: ComponentFixture<ProgressValidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressValidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
