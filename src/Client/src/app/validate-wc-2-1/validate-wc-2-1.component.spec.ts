import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateWc21Component } from './validate-wc-2-1.component';

describe('ValidateWc21Component', () => {
  let component: ValidateWc21Component;
  let fixture: ComponentFixture<ValidateWc21Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateWc21Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateWc21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
